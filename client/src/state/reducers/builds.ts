import { BuildsList } from '../../../../models/Build'
import { BuildsAction } from '../actionTypes/builds'

interface BuildsState {
    buildsList: BuildsList | null
    loading: boolean
    quantity: number
}

const initialState: BuildsState = {
    buildsList: null,
    loading: false,
    quantity: 25
}

const buildsReducer = (state = initialState, action: BuildsAction): BuildsState => {
    switch (action.type) {
        case 'SET_BUILDS':
            return { ...state, buildsList: action.payload }
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        case 'INCREASE_QUANTITY':
            return { ...state, quantity: state.quantity + 10 }
        default:
            return state
    }
}

export default buildsReducer