const express = require('express')

const {
    getBuild,
    getBuildLogs,
    getBuilds,
    setBuild
} = require('../controllers/builds')

const buildsRouter = new express.Router()

buildsRouter.get('/', getBuilds)
buildsRouter.get('/:buildId', getBuild)
buildsRouter.get('/:buildId/logs', getBuildLogs)

buildsRouter.post('/:commitHash', setBuild)

module.exports = buildsRouter