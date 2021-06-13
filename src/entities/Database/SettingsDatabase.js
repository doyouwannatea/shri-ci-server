const Database = require('./Database')

class SettingsDatabase extends Database {

    constructor() {
        super()
        this.settings = null
    }

    async getSettings() {
        if (this.settings)
            return this.settings

        const data = await this.axios.get('/conf')
        this.settings = data.data.data

        return this.settings
    }

    async setSettings(body) {
        const data = await this.axios.post('/conf', body)
        this.settings = data.data.data
        return this.settings
    }
}

module.exports = new SettingsDatabase()