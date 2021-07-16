import { AxiosResponse } from 'axios'
import Database from './Database'
import { ID } from '../../../models'
import {
    BuildItem,
    BuildsList,
    CancelBuildBody,
    FinishBuildBody,
    Logs,
    SetBuildBody,
    SetBuildResponse,
    StartBuildBody
} from '../../../models/Build'

export default class BuildDatabase extends Database {

    logs: Map<ID, Logs>
    logsLength: number

    constructor() {
        super()
        this.logs = new Map()
        this.logsLength = 20
    }

    async getBuilds(limit: string): Promise<BuildsList> {
        const res = await this.axios.get('/build/list', { params: { limit } })
        const data: AxiosResponse<BuildsList> = res.data
        return data.data
    }

    async getBuild(buildId: ID): Promise<BuildItem> {
        const res = await this.axios.get('/build/details', { params: { buildId } })
        const data: AxiosResponse<BuildItem> = res.data
        return data.data
    }

    async getBuildLogs(buildId: ID): Promise<Logs | undefined> {
        if (this.logs.has(buildId))
            return this.logs.get(buildId)

        const res = await this.axios.get('/build/log', { params: { buildId } })

        if (this.logs.size > this.logsLength)
            this.logs.clear()

        if (res.data) {
            this.logs.set(buildId, res.data)
            return this.logs.get(buildId)
        }

        return ''
    }

    async setBuild(body: SetBuildBody): Promise<SetBuildResponse> {
        const res = await this.axios.post('/build/request', body)
        const data: AxiosResponse<SetBuildResponse> = res.data
        return data.data
    }

    async startBuild(body: StartBuildBody): Promise<void> {
        try {
            await this.axios.post('/build/start', body)
        } catch (error) {
            console.error(error)
        }
    }

    async finishBuild(body: FinishBuildBody): Promise<void> {
        try {
            await this.axios.post('/build/finish', body)
        } catch (error) {
            console.error(error)
        }
    }

    async cancelBuild(body: CancelBuildBody): Promise<void> {
        try {
            await this.axios.post('/build/cancel', body)
        } catch (error) {
            console.error(error)
        }
    }
}

export const buildDatabase = new BuildDatabase()
