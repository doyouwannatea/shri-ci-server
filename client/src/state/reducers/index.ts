import { Dispatch } from 'react'
import { AnyAction, combineReducers } from 'redux'
import { applyMiddleware, createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import appReducer from './app'
import buildsReducer from './builds'
import settingsReducer from './settings'

export const rootReducer = combineReducers({
    app: appReducer,
    settings: settingsReducer,
    builds: buildsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = Dispatch<AnyAction> & ThunkDispatch<RootState, null, AnyAction>

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>

export default store
