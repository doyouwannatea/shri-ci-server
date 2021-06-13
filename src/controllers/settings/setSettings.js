const { settingsDatabase, Message, ErrorMessage } = require('../../entities')
const { RepoWorker } = require('../../entities')

module.exports = async (req, res) => {
    try {
        await settingsDatabase.setSettings(req.body)
        await RepoWorker.saveRepo(req.body.repoName)

        res.json(new Message('Settings set'))
    } catch (error) {
        res.status(400).json(new ErrorMessage(error?.response?.statusText))
    }
}