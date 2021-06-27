const path = require('path')

module.exports = {
    paths: {
        repo: path.resolve(__dirname, 'repo'),
        builds: path.resolve(__dirname, 'builds'),
        client: path.resolve(__dirname, 'client/build'),
        indexHtml: path.resolve(__dirname, 'client/build/index.html')
    },
    port: 8080
}