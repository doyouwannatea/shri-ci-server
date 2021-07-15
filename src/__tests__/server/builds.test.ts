const { default: axios } = require('axios')
const BuildDatabase = require('../../entities/Database/BuildDatabase')

describe('работа с билдами', () => {
    it('сохранение билда', async () => {
        const body = { data: { data: '1' } }

        const post = axios.post.mockResolvedValueOnce(body)
        const res = await new BuildDatabase(axios).setBuild(body)

        expect(post).toHaveBeenCalledWith('/build/request', body)
        expect(res).toBe('1')
    })

    it('получение всех билдов', async () => {
        const body = { data: { data: [{ id: '1' }, { id: '2' }] } }
        const limit = 25

        const get = axios.get.mockResolvedValueOnce(body)
        const res = await new BuildDatabase(axios).getBuilds(limit)

        expect(get).toBeCalledWith(`/build/list?limit=${limit}`)
        expect(res).toEqual([{ id: '1' }, { id: '2' }])
    })

    it('получение одного билда', async () => {
        const id = '1'
        const body = { data: { data: { id } } }

        const get = axios.get.mockResolvedValueOnce(body)
        const res = await new BuildDatabase(axios).getBuild(id)

        expect(get).toBeCalledWith('/build/details', { params: { buildId: id } })
        expect(res.id).toBe('1')
    })

    it('начать билдинг', async () => {
        const buildId = '1'
        const dateTime = 1625326105704

        const post = axios.post.mockResolvedValueOnce()
        await new BuildDatabase(axios).startBuild(buildId, dateTime)

        expect(post).toBeCalledWith('/build/start', { buildId, dateTime })
    })

    it('инициировать конец билдинга', async () => {
        const buildId = '1'
        const duration = 300
        const success = true
        const buildLog = 'test log'

        const post = axios.post.mockResolvedValueOnce()
        await new BuildDatabase(axios).finishBuild(buildId, duration, success, buildLog)

        expect(post).toBeCalledWith('/build/finish', { buildId, duration, success, buildLog })
    })

    it('отмена билдинга', async () => {
        const buildId = '1'

        const post = axios.post.mockResolvedValueOnce()
        await new BuildDatabase(axios).cancelBuild(buildId)

        expect(post).toBeCalledWith('/build/cancel', { buildId })
    })

    it('получение логов билда', async () => {
        const buildId = '1'
        const log = 'test build logs'
        const data = { data: log }

        const get = axios.get.mockResolvedValueOnce(data)
        const res = await new BuildDatabase(axios).getBuildLogs(buildId)

        expect(get).toBeCalledWith('/build/log', { params: { buildId } })
        expect(res).toBe(log)
    })
})
