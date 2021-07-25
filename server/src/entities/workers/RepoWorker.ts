import { resolve } from 'path'

import { paths } from '../../config'
import BuildDatabase from '../databases/BuildDatabase'
import FileWorker from './FileWorker'
import { concatLog, spawnWithLog } from '../utils'

import { Name, ChildProcessOutput } from '../../../../models'
import { BuildConfig, BuildConfigsList, CommitHash, CommitMessage } from '../../../../models/Build'
import { ExecOptions } from 'child_process'
import { exec, spawn } from 'child-process-promise'
import { BuildCommand } from '../../../../models/Settings'

export default class RepoWorker {
    building: boolean
    buildsQueue: BuildConfigsList

    constructor() {
        this.buildsQueue = []
        this.building = false
    }

    getRepoLink(repoName: Name): string {
        return `https://github.com/${repoName}`
    }

    async getCommitMessage(commitHash: CommitHash, cwd: string = paths.repo): Promise<CommitMessage> {
        const {
            stdout
        } = await spawnWithLog('git', ['log', '--format=%B', '-n', '1', commitHash], { cwd })
        return stdout.trim()
    }

    async getCommitBranch(commitHash: CommitHash, cwd: string = paths.repo): Promise<Name> {
        const {
            stdout
        } = await spawnWithLog('git', ['branch', '-a', '--contains', commitHash], { cwd })
        return stdout.split('\n')[0].replace('*', '').trim()
    }

    async getCommitAuthor(commitHash: CommitHash, cwd: string = paths.repo): Promise<Name> {
        const {
            stdout
        } = await spawnWithLog('git', ['show', '-s', '--format=%ae', commitHash], { cwd })
        return stdout.trim()
    }

    async cloneRepo(repoLink: string, config: ExecOptions): Promise<ChildProcessOutput> {
        return spawn('git', ['clone', repoLink, '.'], config)
    }

    async checkout(commitHash: CommitHash, config: ExecOptions): Promise<ChildProcessOutput> {
        return spawn('git', ['checkout', commitHash], config)
    }

    async installDeps(config: ExecOptions): Promise<ChildProcessOutput> {
        return exec('npm i', config)
    }

    async execBuildCommand(buildCommand: BuildCommand, config: ExecOptions): Promise<string> {
        const {
            stderr,
            stdout
        } = await spawnWithLog('npm', ['run', buildCommand], config)
        return concatLog({ stderr, stdout })
    }

    async pushBuild(config: BuildConfig): Promise<void> {
        try {
            this.buildsQueue.push(config)
            if (!this.building) {
                this.building = true
                while (this.buildsQueue.length !== 0) {
                    const currentBuildConfig = this.buildsQueue.shift()
                    if (currentBuildConfig)
                        await this.build(currentBuildConfig)
                }
                this.building = false
            }
        } catch (error) {
            console.error(error)
        }
    }

    async build(config: BuildConfig, cwd: string = paths.builds): Promise<string | null | undefined> {
        const {
            buildCommand,
            commitHash,
            repoLink,
            buildId,
            buildDate
        } = config

        const buildDatabase = new BuildDatabase(),
            fileWorker = new FileWorker(),
            buildDir = resolve(cwd, buildId),
            buildDirConfig: ExecOptions = {
                shell: 'cmd.exe',
                cwd: buildDir,
                env: {
                    ...process.env,
                    FORCE_COLOR: 'true',
                    TERM: 'xterm-256color'
                }
            }
        let currentTime = Date.now()

        try {
            await fileWorker.createDirIfNotExists(cwd)
            await fileWorker.recreateDir(buildDir)
            await this.cloneRepo(repoLink, buildDirConfig)
            await buildDatabase.startBuild({ buildId, dateTime: buildDate || new Date(currentTime) })
        } catch (error) {
            console.error(error)
            await buildDatabase.cancelBuild({ buildId })
            return null
        }

        try {
            await this.checkout(commitHash, buildDirConfig)
            await this.installDeps(buildDirConfig)

            currentTime = Date.now()
            const buildLog = await this.execBuildCommand(buildCommand, buildDirConfig)
            await buildDatabase.finishBuild({
                buildId,
                buildLog,
                duration: Date.now() - currentTime,
                success: true
            })
            return buildLog
        } catch (error) {
            console.error(error)
            let log = ''

            if (error.stdout || error.stderr) {
                log = concatLog(error)
            }

            await buildDatabase.finishBuild({
                buildId,
                buildLog: log,
                duration: Date.now() - currentTime,
                success: false
            })
        } finally {
            await fileWorker.rmdir(buildDir)
        }
    }
}

export const repoWorker = new RepoWorker()
