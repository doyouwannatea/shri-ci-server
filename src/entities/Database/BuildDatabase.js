const Database = require('./Database')

class BuildDatabase extends Database {

    constructor(axiosInstance) {
        super(axiosInstance)
        this.logs = new Map()
        this.logsLength = 20
    }

    async getBuilds(limit) {
        const res = await this.axios.get(`/build/list?limit=${limit}`)
        return res.data.data
    }

    async getBuild(buildId) {
        const res = await this.axios.get('/build/details', { params: { buildId } })
        return res.data.data
    }

    async getBuildLogs(buildId) {
        if (this.logs.has(buildId))
            return this.logs.get(buildId)

        const res = await this.axios.get('/build/log', { params: { buildId } })

        if (this.logs.size > this.logsLength)
            this.logs.clear()

        this.logs.set(buildId, res.data)
        return this.logs.get(buildId)
    }

    async setBuild(body) {
        const res = await this.axios.post('/build/request', body)
        return res.data.data
    }

    async startBuild(buildId, dateTime) {
        try {
            await this.axios.post('/build/start', { buildId, dateTime })
        } catch (error) {
            console.error(error)
        }
    }

    async finishBuild(buildId, duration, success, buildLog) {
        try {
            await this.axios.post('/build/finish', { buildId, duration, success, buildLog })
        } catch (error) {
            console.error(error)
        }
    }

    async cancelBuild(buildId) {
        try {
            await this.axios.post('/build/cancel', { buildId })
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = BuildDatabase