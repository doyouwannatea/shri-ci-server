const path = require('path')

module.exports = {
    paths: {
        repo: path.resolve(__dirname, 'repo'),
        builds: path.resolve(__dirname, 'builds'),
        client: path.resolve(__dirname, 'client', 'build'),
        indexHtml: path.resolve(__dirname, 'client', 'build', 'index.html'),
        testRepo: path.resolve(__dirname, 'tests', 'repo'),
        testBuilds: path.resolve(__dirname, 'tests', 'builds')
    },
    port: 8080
}