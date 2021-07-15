import { Settings } from '../../models/Settings'
import { SettingsAction } from '../actionTypes/settings'

interface SettingsState {
    settings: Settings
    loading: boolean
    allSettled: boolean
    refreshTimer: number | undefined
}

const initialState: SettingsState = {
    settings: {
        buildCommand: '',
        mainBranch: '',
        period: 0,
        repoName: ''
    },
    allSettled: false,
    loading: false,
    refreshTimer: undefined
}

const settingsReducer = (state = initialState, action: SettingsAction): SettingsState => {
    switch (action.type) {
        case 'SET_SETTINGS':
            return { ...state, settings: action.payload }
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        case 'SETTLE':
            return { ...state, allSettled: action.payload }
        case 'SET_TIMER':
            clearInterval(state.refreshTimer)
            return { ...state, refreshTimer: action.payload }
        default:
            return state
    }
}

export default settingsReducer