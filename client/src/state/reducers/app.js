const initialState = {
    isBuildModalActive: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BUILD_MODAL':
            return { ...state, isBuildModalActive: action.payload }
        default:
            return state
    }
}

export default appReducer