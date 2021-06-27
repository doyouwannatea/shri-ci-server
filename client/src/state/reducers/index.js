import { combineReducers } from 'redux'
import appReducer from './app'
import buildsReducer from './builds'
import settingsReducer from './settings'

export default combineReducers({
    app: appReducer,
    settings: settingsReducer,
    builds: buildsReducer
})