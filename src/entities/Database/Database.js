const axios = require('axios')

class Database {
    constructor() {
        const BASE_URL = 'https://shri.yandex/hw/api/'
        const AUTH_TOKEN = process.env.AUTH_TOKEN || ''

        this.axios = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        })
    }
}

module.exports = Database