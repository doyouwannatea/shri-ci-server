import { resolve } from 'path'

import { paths } from '../../config'
import BuildDatabase from '../databases/BuildDatabase'
import FileWorker from './FileWorker'
import { concatLog } from '../utils'

import { Name, ChildProcessOutput } from '../../../../models'
import { BuildConfig, BuildConfigsList, CommitHash, CommitMessage } from '../../../../models/Build'
import { ExecOptions } from 'child_process'
import { spawn, exec } from 'child-process-promise'

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
        let message = ''
        const promise = spawn('git', ['log', '--format=%B', '-n', '1', commitHash], { cwd })
        promise.childProcess.stdout?.on('data', (buffer: Buffer) => {
            message += buffer.toString()
        })

        promise.childProcess.stderr?.on('data', (buffer: Buffer) => {
            message += buffer.toString()
        })

        await promise
        return message.trim()
    }

    async getCommitBranch(commitHash: CommitHash, cwd: string = paths.repo): Promise<Name> {
        const promise = spawn('git', ['branch', '-a', '--contains', commitHash], { cwd })

        let branch = ''
        promise.childProcess.stdout?.on('data', (buffer: Buffer) => {
            const branches = buffer.toString().split('\n')
            branch = branches[0].replace('*', '').trim()
        })

        await promise
        return branch
    }

    async getCommitAuthor(commitHash: CommitHash, cwd: string = paths.repo): Promise<Name> {
        let author = ''
        const promise = spawn('git', ['show', '-s', '--format=%ae', commitHash], { cwd })
        promise.childProcess.stdout?.on('data', (buffer: Buffer) => {
            author += buffer.toString()
        })

        await promise
        return author.trim()
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
            const output = await exec(buildCommand, buildDirConfig)
            const buildLog = concatLog(output)
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
