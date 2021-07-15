import { ID } from '../../models'
import { BuildItem, BuildsList, CommitHash, Logs } from '../../models/Build'
import { BuildsAction } from '../actionTypes/builds'
import { AppThunk } from '../reducers'

export const setBuilds = (buildsList: BuildsList): BuildsAction => ({ type: 'SET_BUILDS', payload: buildsList })
export const setLoading = (loading: boolean): BuildsAction => ({ type: 'SET_LOADING', payload: loading })
export const increaseQuantity = (): BuildsAction => ({ type: 'INCREASE_QUANTITY' })

export const pushBuild = (commitHash: CommitHash): AppThunk<Promise<ID>> => async (dispatch, getState) => {
    dispatch(setLoading(true))

    try {
        const buildDate = new Date(Date.now())
        const res = await fetch(
            `http://localhost:8080/api/builds/${commitHash}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    buildDate: new Date(buildDate.getTime() - (buildDate.getTimezoneOffset() * 60000))
                })
            }
        )

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        const id: ID = await res.text()
        return id
    } finally {
        dispatch(setLoading(false))
    }
}

export const fetchBuilds = (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    dispatch(setLoading(true))

    try {
        const res = await fetch(`http://localhost:8080/api/builds?limit=${getState().builds.quantity}`)

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        const buildsList: BuildsList = await res.json()
        dispatch(setBuilds(buildsList))
    } finally {
        dispatch(setLoading(false))
    }
}

export const fetchBuild = (buildId: ID): AppThunk<Promise<BuildItem>> => async (dispatch, getState) => {
    dispatch(setLoading(true))

    try {
        const res = await fetch(`http://localhost:8080/api/builds/${buildId}`)

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        const build: BuildItem = await res.json()
        return build
    } finally {
        dispatch(setLoading(false))
    }
}

export const fetchLogs = (buildId: ID): AppThunk<Promise<Logs>> => async (dispatch, getState) => {
    dispatch(setLoading(true))

    try {
        const res = await fetch(`http://localhost:8080/api/builds/${buildId}/logs`)

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        const logs: Logs = await res.text()
        return logs
    } finally {
        dispatch(setLoading(false))
    }
}

