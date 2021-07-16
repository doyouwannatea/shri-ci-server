import { BuildsList } from '../../../../models/Build'

interface SetBuilds {
    type: 'SET_BUILDS'
    payload: BuildsList
}

interface SetLoading {
    type: 'SET_LOADING'
    payload: boolean
}

interface IncreaseQuantity {
    type: 'INCREASE_QUANTITY'
}

export type BuildsAction = SetBuilds | SetLoading | IncreaseQuantity

