const { buildDatabase, ErrorMessage } = require('../../entities')

module.exports = async (req, res) => {
    try {
        const buildId = req.params.buildId
        const logs = await buildDatabase.getBuildLogs(buildId)
        res.send(logs)
    } catch (error) {
        console.error(error)
        res.status(400).json(new ErrorMessage(error))
    }
}