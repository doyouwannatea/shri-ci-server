import { AppAction } from '../actionTypes/app'

interface AppState {
    isBuildModalActive: boolean
}

const initialState: AppState = {
    isBuildModalActive: false
}

const appReducer = (state = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_BUILD_MODAL':
            return { ...state, isBuildModalActive: action.payload }
        default:
            return state
    }
}

export default appReducer