const { buildDatabase, ErrorMessage } = require('../../entities')

module.exports = async (req, res) => {
    const limit = req.query.limit

    try {
        const buildsList = await buildDatabase.getBuilds(limit ? limit : 25)
        res.json(buildsList)
    } catch (error) {
        console.error(error)
        res.status(400).json(new ErrorMessage(error))
    }
}