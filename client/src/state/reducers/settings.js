
const initialState = {
    repo: '',
    build: '',
    branch: '',
    duration: '',
    allSettled: false
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_REPO':
            return { ...state, repo: action.payload }
        case 'SET_BUILD':
            return { ...state, build: action.payload }
        case 'SET_BRANCH':
            return { ...state, branch: action.payload }
        case 'SET_DURATION':
            return { ...state, duration: action.payload }
        case 'SETTLE':
            return { ...state, allSettled: true }
        default:
            return state
    }
}

export default settingsReducer