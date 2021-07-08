const Database = require('./Database')

class SettingsDatabase extends Database {

    constructor(axiosInstance) {
        super(axiosInstance)
        this.settings = null
    }

    async getSettings() {
        if (this.settings)
            return this.settings

        const res = await this.axios.get('/conf')
        this.settings = res.data.data
        return this.settings
    }

    async setSettings(body) {
        const res = await this.axios.post('/conf', body)
        this.settings = res.data.data
        return this.settings
    }
}

module.exports = SettingsDatabase