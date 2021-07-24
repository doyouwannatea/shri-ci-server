import { AppAction } from '../actionTypes/app'

export const setBuildModal = (isActive: boolean): AppAction => (
    { type: 'SET_BUILD_MODAL', payload: isActive }
)