const { access } = require('fs/promises')

function concatLog({ stdout, stderr }) {
    return stdout + '\n' + stderr
}

async function exists(path) {
    try {
        await access(path)
        return true
    } catch (error) {
        return false
    }
}

module.exports = {
    concatLog,
    exists
}