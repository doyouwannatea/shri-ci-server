import { minutesToMilliseconds } from 'date-fns'
import { Settings } from '../../../../models/Settings'
import { SettingsAction } from '../actionTypes/settings'
import { AppThunk } from '../reducers'

export const setSettings = (settings: Settings): SettingsAction => (
    { type: 'SET_SETTINGS', payload: settings }
)
export const setLoading = (loading: boolean): SettingsAction => (
    { type: 'SET_LOADING', payload: loading }
)
export const setTimer = (timerRef: number): SettingsAction => (
    { type: 'SET_TIMER', payload: timerRef }
)
export const applySettings = (isSettle: boolean): SettingsAction => (
    { type: 'SETTLE', payload: isSettle }
)

export const pushSettings = (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    const settings = getState().settings.settings
    dispatch(setLoading(true))
    dispatch(applySettings(false))

    try {
        const res = await fetch('http://localhost:8080/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        })

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        const { period } = settings
        if (period) {
            const timer = setInterval(() => {
                dispatch(fetchSettings())
            }, minutesToMilliseconds(period))
            dispatch(setTimer(Number(timer)))
        }
        dispatch(applySettings(true))
    } finally {
        dispatch(setLoading(false))
    }
}

export const fetchSettings = (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(applySettings(false))

    try {
        const res = await fetch('http://localhost:8080/api/settings')

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        const settings: Settings = await res.json()
        dispatch(setSettings(settings))

        const { period } = settings
        if (period) {
            const timer = setInterval(() => {
                dispatch(fetchSettings())
            }, minutesToMilliseconds(period))
            dispatch(setTimer(Number(timer)))
        }

        dispatch(applySettings(true))
    } finally {
        dispatch(setLoading(false))
    }
}
