import { minutesToMilliseconds } from 'date-fns'

export const setBuild = build => ({ type: 'SET_BUILD', payload: build })
export const setRepo = repo => ({ type: 'SET_REPO', payload: repo })
export const setBranch = branch => ({ type: 'SET_BRANCH', payload: branch })
export const setDuration = duration => ({ type: 'SET_DURATION', payload: duration })
export const setLoading = loading => ({ type: 'SET_LOADING', payload: loading })
export const setTimer = timerRef => ({ type: 'SET_TIMER', payload: timerRef })
export const applySettings = isSettle => ({ type: 'SETTLE', payload: isSettle })

export const setSettings = () => async (dispatch, getState) => {
    const { repo, build, branch, duration } = getState().settings
    dispatch(setLoading(true))
    dispatch(applySettings(false))

    try {
        const res = await fetch('http://localhost:8080/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                repoName: repo,
                buildCommand: build,
                mainBranch: branch,
                period: duration
            })
        })

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        if (duration) {
            const timer = setInterval(() => {
                dispatch(fetchSettings())
            }, minutesToMilliseconds(duration))
            dispatch(setTimer(timer))
        }
        dispatch(applySettings(true))
    } finally {
        dispatch(setLoading(false))
    }
}

export const fetchSettings = () => async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(applySettings(false))

    try {
        const res = await fetch('http://localhost:8080/api/settings')

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        const settings = await res.json()
        const { repoName, buildCommand, mainBranch, period } = settings
        dispatch(setBuild(buildCommand))
        dispatch(setRepo(repoName))
        dispatch(setBranch(mainBranch))
        dispatch(setDuration(period))
        if (period) {
            const timer = setInterval(() => {
                dispatch(fetchSettings())
            }, minutesToMilliseconds(period))
            dispatch(setTimer(timer))
        }

        dispatch(applySettings(true))
    } finally {
        dispatch(setLoading(false))
    }
}