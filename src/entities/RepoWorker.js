const path = require('path')
const util = require('util')
const { rmdir, mkdir } = require('fs/promises')
const exec = util.promisify(require('child_process').exec)

const { paths } = require('../../config')
const BuildDatabase = require('./Database/BuildDatabase')
const { concatLog, exists } = require('./utils')

class RepoWorker {
    constructor() {
        this.buildsQueue = []
        this.building = false
    }

    getRepoLink(repoName) {
        return `https://github.com/${repoName}`
    }

    async getCommitMessage(commitHash, cwd = paths.repo) {
        const res = await exec(`git log --format=%B -n 1 ${commitHash}`, { cwd })
        const message = res.stdout
        return message.trim()
    }

    async getCommitBranch(commitHash, cwd = paths.repo) {
        const res = await exec(`git branch -a --contains ${commitHash}`, { cwd })
        const branches = res.stdout.split('\n')
        return branches[0].replace('*', '').trim()
    }

    async getCommitAuthor(commitHash, cwd = paths.repo) {
        const res = await exec(`git show -s --format=%ae ${commitHash}`, { cwd })
        const author = res.stdout
        return author.trim()
    }

    async recreateDir(path) {
        try {
            await rmdir(path, { recursive: true })
            await mkdir(path)
        } catch (error) {
            console.error(error)
        }
    }

    async cloneRepo(repoLink, config) {
        return exec(`git clone ${repoLink} .`, config)
    }

    async checkout(commitHash, config) {
        return exec(`git checkout ${commitHash}`, config)
    }

    async installDeps(config) {
        return exec('npm i', config)
    }

    async pushBuild(config) {
        try {
            this.buildsQueue.push(config)
            if (!this.building) {
                this.building = true
                while (this.buildsQueue.length !== 0) {
                    const currentBuildConfig = this.buildsQueue.shift()
                    await this.build(currentBuildConfig)
                }
                this.building = false
            }
        } catch (error) {
            console.error(error)
        }
    }

    async build({ buildCommand,
        commitHash,
        repoName,
        buildId,
        buildDate
    }, cwd = paths.builds) {
        const buildDatabase = new BuildDatabase()
        const buildDir = path.resolve(cwd, buildId)
        const buildDirConfig = {
            shell: true,
            cwd: buildDir,
            env: {
                ...process.env,
                FORCE_COLOR: true,
                TERM: 'xterm-256color'
            }
        }
        let currentTime = Date.now()
        if (!buildDate) {
            buildDate = new Date(currentTime)
        }

        try {
            if (!(await exists(cwd))) {
                await mkdir(cwd)
            }

            await this.recreateDir(buildDir)
            await this.cloneRepo(this.getRepoLink(repoName), buildDirConfig)
            await buildDatabase.startBuild(buildId, buildDate)
        } catch (error) {
            console.error(error)
            await buildDatabase.cancelBuild(buildId)
            return
        }

        try {
            await this.checkout(commitHash, buildDirConfig)
            await this.installDeps(buildDirConfig)

            currentTime = Date.now()
            const log = await exec(buildCommand, buildDirConfig)
            const stringLog = concatLog(log)
            await buildDatabase.finishBuild(buildId, Date.now() - currentTime, true, stringLog)
            return stringLog
        } catch (error) {
            console.error(error)
            let log = ''

            if (error.stdout || error.stderr) {
                log = concatLog(error)
            }

            await buildDatabase.finishBuild(buildId, Date.now() - currentTime, false, log)

        } finally {
            await rmdir(buildDir, { recursive: true })
        }
    }
}

module.exports = RepoWorker