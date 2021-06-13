const util = require('util')
const exec = util.promisify(require('child_process').exec)
const execFile = util.promisify(require('child_process').execFile)
const { rmdir } = require('fs/promises')
const { paths } = require('../../config')

class RepoWorker {
    static async getCommitMessage(commitHash) {
        const message = (await exec(`cd ${paths.temp} && git log --format=%B -n 1 ${commitHash}`)).stdout
        return message.trim()
    }

    static async getCommitBranch(commitHash) {
        let branches = (await exec(`cd ${paths.temp} && git branch -a --contains ${commitHash}`)).stdout
        branches = branches.split('\n')
        return branches[0].trim()
    }

    static async getCommitAuthor(commitHash) {
        const author = (await exec(`cd ${paths.temp} && git show -s --format=%ae ${commitHash}`)).stdout
        return author.trim()
    }

    static async saveRepo(repoName) {
        await rmdir(paths.temp, { recursive: true })
        return await execFile('git', ['clone', repoName, paths.temp])
    }
}

module.exports = RepoWorker