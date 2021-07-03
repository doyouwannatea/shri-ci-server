const { settingsDatabase, Message, ErrorMessage } = require('../../entities')
const { repoWorker } = require('../../entities')
const { paths } = require('../../../config')

module.exports = async (req, res) => {
    try {
        await settingsDatabase.setSettings(req.body)
        const repoLink = repoWorker.getRepoLink(req.body.repoName)

        await repoWorker.recreateDir(paths.repo)
        await repoWorker.cloneRepo(repoLink, { cwd: paths.repo })

        res.json(new Message('Settings set'))
    } catch (error) {
        console.error(error)
        const settings = await settingsDatabase.getSettings()
        if (settings) {
            await settingsDatabase.setSettings(settings)
        }

        res.status(400).json(new ErrorMessage(error.message))
    }
}