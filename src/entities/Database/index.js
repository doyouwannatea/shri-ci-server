const BuildDatabase = require('./BuildDatabase')
const SettingsDatabase = require('./SettingsDatabase')

module.exports = {
    buildDatabase: new BuildDatabase(),
    settingsDatabase: new SettingsDatabase()
}