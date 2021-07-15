import axios from 'axios'
import { default as MockAdapter } from 'axios-mock-adapter'
import { paths } from '../../config'
import RepoWorker from '../../entities/workers/RepoWorker'
import { expect } from 'chai'

describe('работа с репозиторием', () => {
    const commitHash = '40f0498'
    const repoWorker = new RepoWorker()

    it('получение данных о коммите', async () => {
        const authorName = await repoWorker.getCommitAuthor(commitHash, paths.testRepo)
        const branchName = await repoWorker.getCommitBranch(commitHash, paths.testRepo)
        const commitMessage = await repoWorker.getCommitMessage(commitHash, paths.testRepo)

        expect([authorName, branchName, commitMessage]).to.deep.equal([
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
        const repoLink = paths.testRepo
        const buildDate = new Date(1626360819935)

        const log = await repoWorker.build({
            buildCommand,
            buildId,
            commitHash,
            repoLink,
            buildDate
        }, paths.testBuilds)

        expect(log).to.equal('"test build command"')
    })
})