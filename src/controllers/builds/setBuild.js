const {
    Build,
    buildDatabase,
    RepoWorker,
    Message,
    ErrorMessage
} = require('../../entities')

module.exports = async (req, res) => {
    const commitHash = req.params.commitHash

    if (!commitHash)
        res.status(400).json({ status: 400, message: 'No commit hash' })

    try {
        const authorName = await RepoWorker.getCommitAuthor(commitHash)
        const branchName = await RepoWorker.getCommitBranch(commitHash)
        const commitMessage = await RepoWorker.getCommitMessage(commitHash)

        const build = new Build({ authorName, branchName, commitHash, commitMessage })
        await buildDatabase.setBuild(build)

        res.json(new Message('Build sets'))
    } catch (error) {
        res.status(400).json(new ErrorMessage(error.response.statusText))
    }
}
