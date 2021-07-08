const axios = require('axios')
const { default: MockAdapter } = require('axios-mock-adapter')
const RepoWorker = require('../../entities/RepoWorker')
const { paths } = require('../../../config')

describe('работа с репозиторием', () => {
    const commitHash = '980aaaa'
    const repoWorker = new RepoWorker()

    it('получение данных о коммите', async () => {
        const authorName = await repoWorker.getCommitAuthor(commitHash, paths.testRepo)
        const branchName = await repoWorker.getCommitBranch(commitHash, paths.testRepo)
        const commitMessage = await repoWorker.getCommitMessage(commitHash, paths.testRepo)

        expect([authorName, branchName, commitMessage]).toEqual([
            'alexandr.bulgatov13@gmail.com',
            'master',
            'initial commit'
        ])
    })

    it('билд коммита', async () => {
        const mock = new MockAdapter(axios)
        mock.onPost('https://shri.yandex/hw/api/build/start').reply(200)
        mock.onPost('https://shri.yandex/hw/api/build/finish').reply(200)
        mock.onPost('https://shri.yandex/hw/api/build/cancel').reply(200)

        const buildCommand = 'npm run build'
        const buildId = '1'
        const repoName = paths.testRepo

        const log = await repoWorker.build({
            buildCommand,
            buildId,
            commitHash,
            repoName
        }, paths.testBuilds)

        expect(log).toMatch(/\"test build command\"/)
        expect().to
    })
})