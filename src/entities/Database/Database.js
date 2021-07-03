const axios = require('axios')

class Database {
    constructor(axiosInstance) {
        this.BASE_URL = 'https://shri.yandex/hw/api'
        const AUTH_TOKEN = process.env.AUTH_TOKEN || ''

        if (axiosInstance) {
            this.axios = axiosInstance
        } else {
            this.axios = axios.create({
                baseURL: this.BASE_URL,
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`
                }
            })
        }
    }
}

module.exports = Database