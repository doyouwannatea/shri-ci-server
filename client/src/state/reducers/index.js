
import { combineReducers } from 'redux'
import appReducer from './app'
import settingsReducer from './settings'

export default combineReducers({
    app: appReducer,
    settings: settingsReducer
})