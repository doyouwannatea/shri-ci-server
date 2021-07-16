import { Request, Response } from 'express'
import { CommitHash } from '../../../models/Build'
import { repoWorker } from '../../entities/workers/RepoWorker'
import { buildDatabase } from '../../entities/databases/BuildDatabase'
import { settingsDatabase } from '../../entities/databases/SettingsDatabase'
import ErrorMessage from '../../entities/messages/ErrorMessage'

export default async (req: Request, res: Response): Promise<void> => {
    const commitHash: CommitHash = req.params.commitHash
    const buildDate: Date = req.body.buildDate

    if (!commitHash) {
        res.status(400).json({ status: 400, message: 'No commit hash' })
        return
    }

    try {
        const authorName = await repoWorker.getCommitAuthor(commitHash)
        const branchName = await repoWorker.getCommitBranch(commitHash)
        const commitMessage = await repoWorker.getCommitMessage(commitHash)

        const { id } = await buildDatabase.setBuild({
            authorName, branchName, commitHash, commitMessage
        })
        res.send(id)

        const settings = await settingsDatabase.getSettings()
        if (!settings) throw new Error('no settings')

        repoWorker.pushBuild({
            buildCommand: settings.buildCommand,
            commitHash: commitHash,
            repoLink: repoWorker.getRepoLink(settings.repoName),
            buildId: id,
            buildDate: buildDate
        })
    } catch (error) {
        console.error(error)
        if (!res.headersSent)
            res.status(400).json(new ErrorMessage(error))
    }
}
