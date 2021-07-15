import { AxiosInstance } from 'axios'
import { AxiosResponse } from '../../models/Build'
import { Settings } from '../../models/Settings'
import Database from './Database'

export default class SettingsDatabase extends Database {

    settings: Settings | null

    constructor(axiosInstance?: AxiosInstance) {
        super(axiosInstance)
        this.settings = null
    }

    async getSettings(): Promise<Settings | null> {
        if (this.settings)
            return this.settings

        const res = await this.axios.get('/conf')
        const axiosData: AxiosResponse<Settings> = res.data
        this.settings = axiosData.data

        return this.settings
    }

    async setSettings(body: Settings): Promise<void> {
        await this.axios.post('/conf', body)
        this.settings = body
    }
}

export const settingsDatabase = new SettingsDatabase()
