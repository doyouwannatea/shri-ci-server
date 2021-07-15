import { Settings } from '../../models/Settings'

interface SetConfiguration {
    type: 'SET_SETTINGS'
    payload: Settings
}

interface SetLoading {
    type: 'SET_LOADING'
    payload: boolean
}

interface SetTimer {
    type: 'SET_TIMER'
    payload: number
}

interface ApplySettings {
    type: 'SETTLE'
    payload: boolean
}

export type SettingsAction = SetConfiguration | SetLoading | SetTimer | ApplySettings