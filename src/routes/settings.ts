import { Router } from 'express'

import {
    getSettings,
    setSettings
} from '../controllers/settings'

const settingsRouter = Router()

settingsRouter.get('/', getSettings)
settingsRouter.post('/', setSettings)

export default settingsRouter