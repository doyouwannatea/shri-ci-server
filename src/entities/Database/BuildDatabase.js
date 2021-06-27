const Database = require('./Database')

class BuildDatabase extends Database {

    constructor() {
        super()
        this.logs = {}
        this.logsLength = 20
    }

    async getBuilds() {
        const res = await this.axios.get('/build/list')
        return res.data.data
    }

    async getBuild(buildId) {
        const res = await this.axios.get('/build/details', { params: { buildId } })
        return res.data.data
    }

    async getBuildLogs(buildId) {
        if (this.logs[buildId])
            return this.logs[buildId]

        const res = await this.axios.get('/build/log', { params: { buildId } })

        if (Object.keys(this.logs).length > this.logsLength)
            this.logs = {}

        this.logs[buildId] = res.data
        return this.logs[buildId]
    }

    async setBuild(body) {
        const res = await this.axios.post('/build/request', body)
        return res.data.data
    }

    async startBuild(buildId, dateTime) {
        return await this.axios.post('/build/start', { buildId, dateTime })
    }

    async finishBuild(buildId, duration, success, buildLog) {
        return await this.axios.post('/build/finish', { buildId, duration, success, buildLog })
    }

    async cancelBuild(buildId) {
        return await this.axios.post('/build/cancel', { buildId })
    }
}

module.exports = new BuildDatabase()