const initialState = {
    repo: '',
    build: '',
    branch: '',
    duration: 0,
    allSettled: false,
    loading: false,
    refreshTimer: null
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_REPO':
            return { ...state, repo: String(action.payload).trim() }
        case 'SET_BUILD':
            return { ...state, build: String(action.payload).trim() }
        case 'SET_BRANCH':
            return { ...state, branch: String(action.payload).trim() }
        case 'SET_DURATION':
            let duration = 0

            if (Boolean(parseInt(action.payload))) {
                duration = parseInt(action.payload)
            }

            return { ...state, duration }
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