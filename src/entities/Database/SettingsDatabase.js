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

    async setSettings({ repo, build, branch, duration }) {
        const res = await this.axios.post('/conf', { repo, build, branch, duration })
        this.settings = res.data.data
        return this.settings
    }
}

module.exports = SettingsDatabase