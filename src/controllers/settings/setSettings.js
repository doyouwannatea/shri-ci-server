const { settingsDatabase, Message, ErrorMessage } = require('../../entities')
const { repoWorker } = require('../../entities')

module.exports = async (req, res) => {
    let settings = null

    try {
        settings = await settingsDatabase.getSettings()
        await settingsDatabase.setSettings(req.body)
        await repoWorker.saveRepo(req.body.repoName)

        res.json(new Message('Settings set'))
    } catch (error) {
        console.error(error)
        if (settings) {
            await settingsDatabase.setSettings(settings)
        }

        res.status(400).json(new ErrorMessage(error.message))
    }
}