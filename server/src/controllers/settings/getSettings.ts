import { Request, Response } from 'express'
import { paths } from '../../config'
import { settingsDatabase } from '../../entities/databases/SettingsDatabase'
import ErrorMessage from '../../entities/messages/ErrorMessage'
import FileWorker from '../../entities/workers/FileWorker'
import { repoWorker } from '../../entities/workers/RepoWorker'

export default async (req: Request, res: Response): Promise<void> => {
    const fileWorker = new FileWorker()
    
    try {
        const settings = await settingsDatabase.getSettings()
        if (!settings) throw new Error('no settings')

        const repoLink = repoWorker.getRepoLink(settings.repoName)

        try {
            await fileWorker.recreateDir(paths.repo)
            await repoWorker.cloneRepo(repoLink, { cwd: paths.repo })
        } catch (error) {
            console.error(error)
        }

        res.json(settings)
    } catch (error) {
        console.error(error)
        res.status(400).json(new ErrorMessage(error.message))
    }
}