const { buildDatabase, ErrorMessage } = require('../../entities')

module.exports = async (req, res) => {
    try {
        const data = await buildDatabase.getBuilds()
        res.json(data)
    } catch (error) {
        res.status(400).json(new ErrorMessage(error.response.statusText))
    }
}