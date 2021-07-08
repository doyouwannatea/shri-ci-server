const path = require('path')

module.exports = {
    paths: {
        repo: path.resolve(__dirname, 'repo'),
        builds: path.resolve(__dirname, 'builds'),
        client: path.resolve(__dirname, 'client', 'build'),
        indexHtml: path.resolve(__dirname, 'client', 'build', 'index.html'),
        testRepo: path.resolve(__dirname, 'src', '__tests__', 'repo'),
        testBuilds: path.resolve(__dirname, 'src', '__tests__', 'builds'),
        desktopTests: path.resolve(__dirname, 'src', '__tests__', 'desktop')
    },
    port: 8080
}