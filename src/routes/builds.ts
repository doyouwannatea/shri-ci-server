import { Router } from 'express'
import {
    getBuild,
    getBuildLogs,
    getBuilds,
    setBuild
} from '../controllers/builds'

const buildsRouter = Router()

buildsRouter.get('/', getBuilds)
buildsRouter.get('/:buildId', getBuild)
buildsRouter.get('/:buildId/logs', getBuildLogs)

buildsRouter.post('/:commitHash', setBuild)

export default buildsRouter