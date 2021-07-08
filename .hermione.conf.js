const { paths } = require('./config')

module.exports = {
    sets: {
        desktop: {
            files: paths.desktopTests
        }
    },
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
}