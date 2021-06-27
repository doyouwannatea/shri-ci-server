const initialState = {
    buildsList: null,
    loading: false
}

const buildsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BUILDS':
            return { ...state, buildsList: action.payload }
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        default:
            return state
    }
}

export default buildsReducer