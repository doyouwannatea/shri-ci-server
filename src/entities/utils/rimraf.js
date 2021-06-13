const rimraf = require('rimraf')

module.exports = async (path) => {
    return new Promise((resolve, reject) => {
        rimraf(path, {}, err => {
            if (err) {
                return reject(err)
            }

            resolve()
        })
    })
}