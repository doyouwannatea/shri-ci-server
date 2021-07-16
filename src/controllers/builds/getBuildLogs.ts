import { Request, Response } from 'express'
import { buildDatabase } from '../../entities/databases/BuildDatabase'
import ErrorMessage from '../../entities/messages/ErrorMessage'
import { ID } from '../../../models'

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const buildId: ID = req.params.buildId
        const logs = await buildDatabase.getBuildLogs(buildId)
        res.send(logs)
    } catch (error) {
        console.error(error)
        res.status(400).json(new ErrorMessage(error))
    }
}