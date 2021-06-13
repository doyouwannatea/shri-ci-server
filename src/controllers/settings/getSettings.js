const { settingsDatabase, ErrorMessage } = require('../../entities')

module.exports = async (req, res) => {
    try {
        const repoConf = await settingsDatabase.getSettings()
        res.json(repoConf)
    } catch (error) {
        res.status(400).json(new ErrorMessage(error?.response?.statusText))
    }

}