# Node.Домашка 💻

API у сервера получился такой:

GET `/api/settings` - получение сохраненных настроек

POST `/api/settings` - cохранение настроек

GET  `/api/builds` - получение списка сборок

POST `/api/builds/:commitHash` - добавление сборки в очередь

GET  `/api/builds/:buildId` - получение информации о конкретной сборке

GET  `/api/builds/:buildId/logs` - получение логов билда (сплошной текст)

## Сущности

### RepoWorker

Класс осуществляет операции над репозиторием в папке **temp**.

```js
class RepoWorker {
    static async getCommitMessage(commitHash) {
        const message = (await exec(`cd ${paths.temp} && git log --format=%B -n 1 ${commitHash}`)).stdout
        return message.trim()
    }

    static async getCommitBranch(commitHash) {
        let branches = (await exec(`cd ${paths.temp} && git branch -a --contains ${commitHash}`)).stdout
        branches = branches.split('\n')
        return branches[0].trim()
    }

    static async getCommitAuthor(commitHash) {
        const author = (await exec(`cd ${paths.temp} && git show -s --format=%ae ${commitHash}`)).stdout
        return author.trim()
    }

    static async saveRepo(repoName) {
        await rmdir(paths.temp, { recursive: true })
        return await execFile('git', ['clone', repoName, paths.temp])
    }

    static async build(buildCommand) {
        return exec(`cd ${paths.temp} && ${buildCommand}`)
    }
}
```

### Database

Родительский класс для классов реализующих работу с БД.

```js
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
```

## Токен

Токен храню в переменных окружения используя библиотеку **dotenv**.

`AUTH_TOKEN={token}`

## Кеширование

Реализовал кеширование настроек репозитория и логов сборок.

`src\entities\Database\SettingsDatabase.js` - Настройки
`src\entities\Database\BuildDatabase.js` - Логи
