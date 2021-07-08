import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import BuildModal from './BuildModal'
import rootReducer from '../../../state/reducers'
import { setBuildModal } from '../../../state/actions/app'

afterEach(cleanup)

describe('BuildModal.js', () => {
    it('модальное окно открывается при изменении состояния редьюсера', () => {
        const store = createStore(rootReducer, applyMiddleware(thunk))

        render(
            <Provider store={store} >
                <BuildModal />
            </Provider>
        )

        store.dispatch(setBuildModal(false))
        expect(screen.queryByText(/New build/i)).not.toBeInTheDocument()
        store.dispatch(setBuildModal(true))
        expect(screen.queryByText(/New build/i)).toBeInTheDocument()
    })
})

