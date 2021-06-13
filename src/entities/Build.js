class Build {
    commitMessage = ''
    commitHash = ''
    branchName = ''
    authorName = ''

    constructor({ commitHash, commitMessage, branchName, authorName }) {
        this.commitMessage = commitMessage
        this.commitHash = commitHash
        this.branchName = branchName
        this.authorName = authorName
    }
}

module.exports = Build