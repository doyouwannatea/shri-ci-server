import { Request, Response } from 'express'
import { buildDatabase } from '../../entities/databases/BuildDatabase'
import ErrorMessage from '../../entities/messages/ErrorMessage'
import { ID } from '../../models'

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const buildId: ID = req.params.buildId
        const build = await buildDatabase.getBuild(buildId)
        res.json(build)
    } catch (error) {
        console.error(error)
        res.status(400).json(new ErrorMessage(error))
    }
}