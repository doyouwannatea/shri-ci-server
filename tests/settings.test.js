jest.unmock('axios')
const { default: axios } = require('axios')
const SettingsDatabase = require('../src/entities/Database/SettingsDatabase')

jest.mock('axios')

describe('работа с настройками', () => {
    it('получение настроек с сервера', async () => {
        const settings = { id: '1' }
        const body = { data: { data: settings } }

        const get = axios.get.mockResolvedValueOnce(body)
        const res = await new SettingsDatabase(axios).getSettings()

        expect(get).toHaveBeenCalledWith('/conf')
        expect(res).toBe(settings)
    })

    it('сохранение настроек на сервер', async () => {
        const settings = { id: '1' }
        const data = { data: { data: settings } }
        const body = {
            repo: 'repo',
            build: 'npm run build',
            branch: 'master',
            duration: 300
        }

        const post = axios.post.mockResolvedValueOnce(data)
        await new SettingsDatabase(axios).setSettings(body)

        expect(post).toHaveBeenCalledWith('/conf', body)
    })
})
