const { buildDatabase, ErrorMessage } = require('../../entities')

module.exports = async (req, res) => {
    try {
        const buildsList = await buildDatabase.getBuilds()
        res.json(buildsList)
    } catch (error) {
        console.log(error)
        res.status(400).json(new ErrorMessage(error))
    }
}