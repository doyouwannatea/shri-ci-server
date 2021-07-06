import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import fetchMock from 'jest-fetch-mock'
import { cleanup, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Settings from './Settings'
import rootReducer from '../../../state/reducers'
import { setLoading, setBranch, setBuild, setRepo } from '../../../state/actions/settings'

beforeEach(() => {
    fetchMock.doMock()
})

afterEach(cleanup)

describe('Settings.js', () => {
    it('рендер', () => {
        const store = createStore(rootReducer, applyMiddleware(thunk))

        const { queryByTestId } = render(
            <Provider store={store} >
                <Settings />
            </Provider >
        )

        expect(queryByTestId('settings-form')).toBeInTheDocument()
    })

    it('форма заблокирована если идёт загрузка', () => {
        const store = createStore(rootReducer, applyMiddleware(thunk))
        store.dispatch(setLoading(true))
        store.dispatch(setBranch('master'))
        store.dispatch(setBuild('npm run build'))
        store.dispatch(setRepo('doyouwannatea/repo'))
        fetch.mockResponse(200)

        const { getByTestId, getByPlaceholderText } = render(
            <Provider store={store} >
                <Settings />
            </Provider >
        )

        const form = getByTestId('settings-form')
        const submitBtn = getByTestId('submit-btn')

        fireEvent.submit(form)
        fireEvent.click(submitBtn)
    })

    // it('форма отправляется', () => {

    // })

    // it('сброс настроек работает', () => {

    // })
})
