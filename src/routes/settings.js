const express = require('express')

const {
    getSettings,
    setSettings
} = require('../controllers/settings')

const settingsRouter = new express.Router()

settingsRouter.get('/', getSettings)
settingsRouter.post('/', setSettings)

module.exports = settingsRouter