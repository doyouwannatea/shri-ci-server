import { paths } from '../../config'
import { Request, Response } from 'express'
import { repoWorker } from '../../entities/workers/RepoWorker'
import { settingsDatabase } from '../../entities/databases/SettingsDatabase'
import Message from '../../entities/messages/Message'
import ErrorMessage from '../../entities/messages/ErrorMessage'
import { Settings } from '../../models/Settings'

export default async (req: Request, res: Response): Promise<void> => {
    const settings: Settings = req.body

    try {
        await repoWorker.recreateDir(paths.repo)
        const repoLink = repoWorker.getRepoLink(settings.repoName)
        await repoWorker.cloneRepo(repoLink, { cwd: paths.repo })

        await settingsDatabase.setSettings(settings)
        res.json(new Message('Settings set'))
    } catch (error) {
        console.error(error)
        res.status(400).json(new ErrorMessage(error.message))
    }
}