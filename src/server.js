const express = require('express')
const app = express()

require('dotenv').config()
const { port, paths } = require('../config')
const { enableCors } = require('./middleware')
const { settingsRouter, buildsRouter } = require('./routes')

app.use(express.json())
app.use(express.static(paths.client))
app.use(enableCors)

app.use('/api/settings', settingsRouter)
app.use('/api/builds', buildsRouter)

app.get('*', (req, res) => {
    res.sendFile(paths.indexHtml)
})

app.listen(port, () =>
    console.log(`Server started at http://localhost:${port}/`)
)

module.exports = app