import React from 'react'
import fetchMock, { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock'
import { cleanup, render, fireEvent, screen, act, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import '@testing-library/jest-dom'

import App from './App'
import rootReducer from '../../state/reducers'
import { applySettings } from '../../state/actions/settings'
import { setBuildModal } from '../../state/actions/app'

beforeAll(enableFetchMocks)
afterAll(disableFetchMocks)

beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.doMock()
})
afterEach(cleanup)

describe('App.js', () => {
    it('рендер', () => {
        const store = createStore(rootReducer, applyMiddleware(thunk))
        const history = createMemoryHistory()

        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store} >
                    <App />
                </Provider>
            </Router>
        )
        expect(getByTestId('app-page')).toBeInTheDocument()
    })

    it('после клика на кнопку настроек произошёл редирект на страницу настроек', () => {
        const repoName = 'doyouwannatea/Rainbow',
            mainBranch = 'master',
            buildCommand = 'npm run build',
            period = 10

        const history = createMemoryHistory()
        const store = createStore(rootReducer, applyMiddleware(thunk))
        fetchMock.mockResponseOnce(JSON.stringify({ repoName, buildCommand, mainBranch, period }))

        render(
            <Router history={history}>
                <Provider store={store} >
                    <App />
                </Provider>
            </Router>
        )

        fireEvent.click(screen.getByText(/open settings/i))
        expect(screen.getByText(/Synchronize every/i)).toBeInTheDocument()
    })

    it('после ввода хэша коммита в модальное окно происходит редирект на страницу билда', async () => {
        const testHash = '111testhash111'
        const testBuildId = '111buildid111'
        const history = createMemoryHistory()
        const store = createStore(rootReducer, applyMiddleware(thunk))
        const buildTest = JSON.stringify({
            authorName: "alexandr.bulgatov13@gmail.com",
            branchName: "master",
            buildNumber: 185,
            commitHash: testHash,
            commitMessage: "add README",
            configurationId: "98529ed5-f5dd-44bc-ac29-ddb119e76db2",
            duration: 8707,
            id: testBuildId,
            start: "2021-07-07T14:59:45.144",
            status: "Success"
        })
        const logTest = 'test log'

        fetchMock.mockResponseOnce(JSON.stringify({ message: testBuildId }))
            .mockResponseOnce(buildTest)
            .mockResponseOnce(logTest)

        render(
            <Router history={history}>
                <Provider store={store} >
                    <App />
                </Provider>
            </Router>
        )

        store.dispatch(setBuildModal(true))
        const buildModalForm = screen.queryByTestId('build-modal-form')
        const buildModalInput = screen.queryByTestId('build-modal-input')

        fireEvent.change(buildModalInput, { target: { value: testHash } })

        expect(screen.queryByText(/open settings/i)).toBeInTheDocument()
        fireEvent.submit(buildModalForm)

        await waitFor(() => expect(screen.queryByText(/open settings/i)).not.toBeInTheDocument())
        await waitFor(() => expect(screen.queryByText(testHash)).toBeInTheDocument())
    })
})

