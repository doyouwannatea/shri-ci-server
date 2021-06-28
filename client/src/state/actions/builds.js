export const setBuilds = buildsList => ({ type: 'SET_BUILDS', payload: buildsList })
export const setLoading = loading => ({ type: 'SET_LOADING', payload: loading })
export const increaseQuantity = () => ({ type: 'INCREASE_QUANTITY' })

export const setBuild = (commitHash) => async (dispatch, getState) => {
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

        const buildData = await res.json()
        return buildData.message
    } finally {
        dispatch(setLoading(false))
    }
}

export const fetchBuilds = () => async (dispatch, getState) => {
    dispatch(setLoading(true))

    try {
        const res = await fetch(`http://localhost:8080/api/builds?limit=${getState().builds.quantity}`)

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        const buildsList = await res.json()
        dispatch(setBuilds(buildsList))
    } finally {
        dispatch(setLoading(false))
    }
}

export const fetchBuild = (buildNumber) => async (dispatch, getState) => {
    dispatch(setLoading(true))

    try {
        const res = await fetch(`http://localhost:8080/api/builds/${buildNumber}`)

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        const build = await res.json()
        return build
    } finally {
        dispatch(setLoading(false))
    }
}

export const fetchLogs = (buildNumber) => async (dispatch, getState) => {
    dispatch(setLoading(true))

    try {
        const res = await fetch(`http://localhost:8080/api/builds/${buildNumber}/logs`)

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        const logs = await res.text()
        return logs
    } finally {
        dispatch(setLoading(false))
    }
}

