import axios, { AxiosInstance } from 'axios'

export default class Database {

    axios: AxiosInstance

    constructor(axiosInstance?: AxiosInstance) {
        const BASE_URL = 'https://shri.yandex/hw/api'
        const AUTH_TOKEN = process.env.AUTH_TOKEN || ''

        this.axios = axiosInstance || axios.create({
            baseURL: BASE_URL,
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        })
    }
}