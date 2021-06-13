const { buildDatabase, ErrorMessage } = require('../../entities')

module.exports = async (req, res) => {
    try {
        const buildId = req.params.buildId
        const data = await buildDatabase.getBuild(buildId)
        await buildDatabase.build(buildId)
        res.json(data)
    } catch (error) {
        res.status(400).json(new ErrorMessage(error.response.statusText))
    }
}