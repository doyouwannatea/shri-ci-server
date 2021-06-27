const { buildDatabase, ErrorMessage } = require('../../entities')

module.exports = async (req, res) => {
    try {
        const buildId = req.params.buildId
        const build = await buildDatabase.getBuild(buildId)
        res.json(build)
    } catch (error) {
        console.error(error)
        res.status(400).json(new ErrorMessage(error))
    }
}