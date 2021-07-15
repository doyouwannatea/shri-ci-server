import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import fetchMock, { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock'
import { cleanup, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Settings from './Settings'
import { rootReducer } from '../../../state/reducers'
import { setLoading, setSettings } from '../../../state/actions/settings'

beforeAll(enableFetchMocks)
afterAll(disableFetchMocks)

beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.doMock()
})
afterEach(cleanup)

describe('Settings.js', () => {
    it('форма рендерится', () => {
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

        const { getByTestId } = render(
            <Provider store={store} >
                <Settings />
            </Provider >
        )

        const form = getByTestId('settings-form')
        const submitBtn = getByTestId('submit-btn')
        const repoInput = getByTestId('repo-input')
        const buildCommandInput = getByTestId('build-command-input')
        const branchNameInput = getByTestId('branch-name-input')

        fireEvent.change(repoInput, { target: { value: 'doyouwannatea/Rainbow' } })
        fireEvent.change(buildCommandInput, { target: { value: 'npm run build' } })
        fireEvent.change(branchNameInput, { target: { value: 'master' } })

        fireEvent.submit(form)
        fireEvent.click(submitBtn)

        expect(store.getState().settings.settings.repoName).toBe('')
        expect(store.getState().settings.settings.buildCommand).toBe('')
        expect(store.getState().settings.settings.mainBranch).toBe('')
    })

    it('настройки сбрасываются после клика на кнопку', () => {
        const store = createStore(rootReducer, applyMiddleware(thunk))

        const repo = 'doyouwannatea/Rainbow',
            branch = 'master',
            build = 'npm run build',
            duration = 10

        store.dispatch(setSettings({
            mainBranch: branch,
            buildCommand: build,
            period: duration,
            repoName: repo
        }))

        const { getByTestId } = render(
            <Provider store={store} >
                <Settings />
            </Provider >
        )

        const cancelBtn = getByTestId('cancel-btn')
        const repoInput = getByTestId('repo-input')
        const buildCommandInput = getByTestId('build-command-input')
        const branchNameInput = getByTestId('branch-name-input')
        const durationInput = getByTestId('duration-input')

        fireEvent.change(repoInput, { target: { value: '' } })
        fireEvent.change(buildCommandInput, { target: { value: '' } })
        fireEvent.change(branchNameInput, { target: { value: '' } })
        fireEvent.change(durationInput, { target: { value: 0 } })

        fireEvent.click(cancelBtn)
        expect(repoInput).toHaveAttribute('value', repo)
        expect(buildCommandInput).toHaveAttribute('value', build)
        expect(branchNameInput).toHaveAttribute('value', branch)
        expect(durationInput).toHaveAttribute('value', String(duration))
    })
})
