const Database = require('./Database')

class SettingsDatabase extends Database {
    async getSettings() {
        const data = await this.axios.get('/conf')
        return data.data.data
    }

    async setSettings(body) {
        const data = await this.axios.post('/conf', body)
        return data.data.data
    }
}

module.exports = new SettingsDatabase()