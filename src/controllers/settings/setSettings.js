const { settingsDatabase, Message, ErrorMessage } = require('../../entities')
const { repoWorker } = require('../../entities')
const { paths } = require('../../../config')

module.exports = async (req, res) => {
    try {
        await repoWorker.recreateDir(paths.repo)
        const repoLink = repoWorker.getRepoLink(req.body.repoName)
        await repoWorker.cloneRepo(repoLink, { cwd: paths.repo })

        await settingsDatabase.setSettings(req.body)
        res.json(new Message('Settings set'))
    } catch (error) {
        console.error(error)
        res.status(400).json(new ErrorMessage(error.message))
    }
}