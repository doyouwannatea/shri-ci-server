const Database = require('./Database')

class BuildDatabase extends Database {
    async getBuilds() {
        const data = await this.axios.get('/build/list')
        return data.data.data
    }

    async getBuild(buildId) {
        const data = await this.axios.get('/build/details', { params: { buildId } })
        return data.data.data
    }

    async getBuildLogs(buildId) {
        const data = await this.axios.get('/build/log', { params: { buildId } })
        return data.data
    }

    async setBuild(body) {
        const data = await this.axios.post('/build/request', body)
        return data.data
    }

    async startBuild(buildId, dateTime) {
        return this.axios.post('/build/start', { buildId, dateTime })
    }

    async finishBuild(buildId, duration, success, buildLog) {
        const data = await this.axios.post('/build/finish', { buildId, duration, success, buildLog })
        return data
    }

    async cancelBuild(buildId) {
        const data = await this.axios.post('/build/cancel', { buildId })
        return data
    }
}

module.exports = new BuildDatabase()