const {
    Build,
    buildDatabase,
    repoWorker,
    Message,
    ErrorMessage,
    settingsDatabase
} = require('../../entities')

module.exports = async (req, res) => {
    const commitHash = req.params.commitHash
    const buildDate = req.body.buildDate

    if (!commitHash)
        return res.status(400).json({ status: 400, message: 'No commit hash' })

    try {
        const authorName = await repoWorker.getCommitAuthor(commitHash)
        const branchName = await repoWorker.getCommitBranch(commitHash)
        const commitMessage = await repoWorker.getCommitMessage(commitHash)

        const build = new Build({ authorName, branchName, commitHash, commitMessage })
        const { id } = await buildDatabase.setBuild(build)
        res.json(new Message(id))

        const settings = await settingsDatabase.getSettings()

        repoWorker.pushBuild({
            buildCommand: settings.buildCommand,
            commitHash: commitHash,
            repoName: repoWorker.getRepoLink(settings.repoName),
            buildId: id,
            buildDate: buildDate
        })
    } catch (error) {
        console.error(error)
        if (!res.headersSent)
            res.status(400).json(new ErrorMessage(error))
    }
}
