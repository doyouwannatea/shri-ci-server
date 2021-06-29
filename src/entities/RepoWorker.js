const path = require('path')
const util = require('util')
const { rmdir, mkdir } = require('fs/promises')
const exec = util.promisify(require('child_process').exec)

const { paths } = require('../../config')
const { buildDatabase } = require('./Database')
const { concatLog, exists } = require('./utils')

class RepoWorker {
    constructor() {
        this.buildsQueue = []
        this.building = false
    }

    getRepoLink(repoName) {
        return `https://github.com/${repoName}`
    }

    async getCommitMessage(commitHash) {
        const res = await exec(`git log --format=%B -n 1 ${commitHash}`, { cwd: paths.repo })
        const message = res.stdout
        return message.trim()
    }

    async getCommitBranch(commitHash) {
        const res = await exec(`git branch -a --contains ${commitHash}`, { cwd: paths.repo })
        const branches = res.stdout.split('\n')
        return branches[0].replace('*', '').trim()
    }

    async getCommitAuthor(commitHash) {
        const res = await exec(`git show -s --format=%ae ${commitHash}`, { cwd: paths.repo })
        const author = res.stdout
        return author.trim()
    }

    async saveRepo(repoName) {
        await rmdir(paths.repo, { recursive: true })
        await mkdir(paths.repo)
        return exec(`git clone ${this.getRepoLink(repoName)} .`, { cwd: paths.repo })
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

    async build({ buildCommand, commitHash, repoName, buildId, buildDate }) {
        const buildDir = path.resolve(paths.builds, buildId)
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
            if (!(await exists(paths.builds))) {
                await mkdir(paths.builds)
            }

            await mkdir(buildDir)
            await exec(`git clone ${this.getRepoLink(repoName)} .`, buildDirConfig)
            await buildDatabase.startBuild(buildId, buildDate)
        } catch (error) {
            console.error(error)
            await buildDatabase.cancelBuild(buildId)
            return
        }

        try {
            await exec(`git checkout ${commitHash}`, buildDirConfig)
            await exec('npm i', buildDirConfig)

            currentTime = Date.now()
            const log = await exec(buildCommand, buildDirConfig)
            await buildDatabase.finishBuild(buildId, Date.now() - currentTime, true, concatLog(log))
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

module.exports = new RepoWorker()