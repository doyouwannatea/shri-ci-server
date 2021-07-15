import { Request, Response } from 'express'
import { buildDatabase } from '../../entities/databases/BuildDatabase'
import ErrorMessage from '../../entities/messages/ErrorMessage'

export default async (req: Request, res: Response): Promise<void> => {
    const limit = req.query.limit

    try {
        if (typeof limit === 'string') {
            const buildsList = await buildDatabase.getBuilds(limit ? limit : '25')
            res.json(buildsList)
            return
        }

        throw new Error('limit is not a string')
    } catch (error) {
        console.error(error)
        res.status(400).json(new ErrorMessage(error))
    }
}