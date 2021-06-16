const RepoWorker = require('../RepoWorker')
const Database = require('./Database')
const settingsDatabase = require('./SettingsDatabase')

class BuildDatabase extends Database {

    constructor() {
        super()
        this.logs = {}
    }

    async getBuilds() {
        const data = await this.axios.get('/build/list')
        return data.data.data
    }

    async getBuild(buildId) {
        const data = await this.axios.get('/build/details', { params: { buildId } })
        return data.data.data
    }

    async getBuildLogs(buildId) {
        if (this.logs[buildId]) {
            return this.logs[buildId]
        }
        const data = await this.axios.get('/build/log', { params: { buildId } })

        this.logs[buildId] = data.data
        return this.logs[buildId]
    }

    async setBuild(body) {
        const data = await this.axios.post('/build/request', body)
        return data.data
    }

    // ----------------------------------------------------------
    // Не успел довести до ума 😥
    // ----------------------------------------------------------
    async build(buildId) {
        const settings = await settingsDatabase.getSettings()
        const startTime = Date.now()

        try {
            await this.startBuild(buildId, new Date(Date.now()))
            const stream = await RepoWorker.build(settings.buildCommand)
            const endTime = Date.now()
            this.finishBuild(buildId, endTime - startTime, true, stream.stdout)
        } catch (error) {
            const endTime = Date.now()
            await this.finishBuild(buildId, endTime - startTime, false, error.response.statusText)
        }
    }

    startBuild(buildId, dateTime) {
        return this.axios.post('/build/start', { buildId, dateTime })
    }

    finishBuild(buildId, duration, success, buildLog) {
        return this.axios.post('/build/finish', { buildId, duration, success, buildLog })
    }

    cancelBuild(buildId) {
        return this.axios.post('/build/cancel', { buildId })
    }
    // ----------------------------------------------------------
    // ----------------------------------------------------------
}

module.exports = new BuildDatabase()