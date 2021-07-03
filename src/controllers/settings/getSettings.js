const { settingsDatabase, ErrorMessage, repoWorker } = require('../../entities')
const { paths } = require('../../../config')

module.exports = async (req, res) => {
    try {
        const settings = await settingsDatabase.getSettings()
        const repoLink = repoWorker.getRepoLink(settings.repoName)

        await repoWorker.recreateDir(paths.repo)
        await repoWorker.cloneRepo(repoLink, { cwd: paths.repo })

        res.json(settings)
    } catch (error) {
        console.error(error)
        res.status(400).json(new ErrorMessage(error.message))
    }
}