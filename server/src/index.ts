import express = require('express')
import { config } from 'dotenv'
config()

import { port, paths } from './config'
import { enableCors } from './middleware'
import { settingsRouter, buildsRouter } from './routes'

const app = express()

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
