const { settingsDatabase, ErrorMessage, repoWorker } = require('../../entities')

module.exports = async (req, res) => {
    try {
        const settings = await settingsDatabase.getSettings()
        await repoWorker.saveRepo(settings.repoName)

        res.json(settings)
    } catch (error) {
        console.error(error)
        res.status(400).json(new ErrorMessage(error.message))
    }
}