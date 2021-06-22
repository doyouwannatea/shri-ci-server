const path = require('path')

module.exports = {
    paths: {
        temp: path.resolve(__dirname, 'temp'),
        client: path.resolve(__dirname, 'client/build')
    },
    port: 3000
}