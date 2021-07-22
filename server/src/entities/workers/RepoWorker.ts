import { resolve } from 'path'
import { promisify } from 'util'
import { rmdir, mkdir } from 'fs/promises'

import { paths } from '../../config'
import BuildDatabase from '../databases/BuildDatabase'
import { concatLog, exists } from '../utils'

import { Name, ChildProcessOutput } from '../../../../models'
import { BuildConfig, BuildConfigsList, CommitHash, CommitMessage } from '../../../../models/Build'
import { ExecOptions, exec } from 'child_process'

const prExec = promisify(exec)

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
        const res = await prExec(`git log --format=%B -n 1 ${commitHash}`, { cwd })
        const message = res.stdout
        return message.trim()
    }

    async getCommitBranch(commitHash: CommitHash, cwd: string = paths.repo): Promise<Name> {
        const res = await prExec(`git branch -a --contains ${commitHash}`, { cwd })
        const branches = res.stdout.split('\n')
        return branches[0].replace('*', '').trim()
    }

    async getCommitAuthor(commitHash: CommitHash, cwd: string = paths.repo): Promise<Name> {
        const res = await prExec(`git show -s --format=%ae ${commitHash}`, { cwd })
        const author = res.stdout
        return author.trim()
    }

    async recreateDir(path: string): Promise<void> {
        try {
            await rmdir(path, { recursive: true })
            await mkdir(path)
        } catch (error) {
            console.error(error)
        }
    }

    async cloneRepo(repoLink: string, config: ExecOptions): Promise<ChildProcessOutput> {
        return prExec(`git clone ${repoLink} .`, config)
    }

    async checkout(commitHash: CommitHash, config: ExecOptions): Promise<ChildProcessOutput> {
        return prExec(`git checkout ${commitHash}`, config)
    }

    async installDeps(config: ExecOptions): Promise<ChildProcessOutput> {
        return prExec('npm i', config)
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
        const buildDatabase = new BuildDatabase()
        const buildDir = resolve(cwd, buildId)
        const buildDirConfig: ExecOptions = {
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
            if (!(await exists(cwd))) {
                await mkdir(cwd)
            }

            await this.recreateDir(buildDir)
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
            const output = await prExec(buildCommand, buildDirConfig)
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
            await rmdir(buildDir, { recursive: true })
        }
    }
}

export const repoWorker = new RepoWorker()
