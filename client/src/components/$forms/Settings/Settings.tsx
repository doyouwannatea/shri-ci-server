
import React, { useCallback, useEffect, useState } from 'react'
import { useDismissToasts } from '../../../hooks'
import { toast } from 'react-toastify'
import { setSettings, fetchSettings, pushSettings } from '../../../state/actions/settings'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

import FormInput from '../FormInput'
import Button from '../../$buttons/Button'

import './Settings.css'

const Settings = () => {
    useDismissToasts()
    const dispatch = useAppDispatch()

    const settings = useAppSelector(state => state.settings.settings)
    const loading = useAppSelector(state => state.settings.loading)
    const allSettled = useAppSelector(state => state.settings.allSettled)

    const [repoName, setRepoName] = useState(settings.repoName)
    const [buildCommand, setBuildCommand] = useState(settings.buildCommand)
    const [mainBranch, setMainBranch] = useState(settings.mainBranch)
    const [period, setPeriod] = useState(settings.period)

    const cancelSettings = useCallback(() => {
        setRepoName(settings.repoName)
        setBuildCommand(settings.buildCommand)
        setMainBranch(settings.mainBranch)
        setPeriod(settings.period)
    }, [settings.buildCommand, settings.mainBranch, settings.period, settings.repoName])

    useEffect(() => {
        cancelSettings()
    }, [cancelSettings])

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (loading)
            return toast.info('The repository is being copied, please wait.')

        if (allSettled
            && repoName.trim() === settings.repoName
            && buildCommand.trim() === settings.buildCommand
            && mainBranch.trim() === settings.mainBranch
            && period === settings.period)
            return toast.info('These are your current settings.')

        dispatch(setSettings({ buildCommand, mainBranch, period, repoName }))

        try {
            toast.info('Setting preferences.')
            await dispatch(pushSettings())
            toast.success('The settings are set.')
        } catch (error) {
            console.error(error)
            dispatch(setSettings({
                repoName: '',
                mainBranch: '',
                buildCommand: '',
                period: 0
            }))
            await dispatch(fetchSettings())
            toast.error('Setup error.')
            toast.info('Retrieving old settings.')
        }
    }

    return (
        <form onSubmit={submitHandler} className="settings" data-testid="settings-form">
            <FormInput
                testId="repo-input"
                className="settings__input"
                value={repoName}
                setValue={setRepoName}
                label="GitHub repository"
                placeholder="user-name/repo-name"
                required
                clearBtn />

            <FormInput
                testId="build-command-input"
                className="settings__input"
                value={buildCommand}
                setValue={setBuildCommand}
                label="Build command"
                placeholder="command"
                required
                clearBtn />

            <FormInput
                testId="branch-name-input"
                className="settings__input"
                value={mainBranch}
                setValue={setMainBranch}
                label="Main branch"
                placeholder="branch name"
                required
                clearBtn />

            <div>
                Synchronize every
                <FormInput
                    testId="duration-input"
                    value={String(period)}
                    setValue={value => setPeriod(Number(value))}
                    type="number"
                    short
                    inline
                    min={0} />
                minutes
            </div>

            <div className="settings__actions">
                <Button
                    disabled={loading}
                    variant="primary"
                    testId="submit-btn">Save</Button>
                <Button
                    disabled={loading}
                    type="button"
                    action={cancelSettings}
                    testId="cancel-btn">Cancel</Button>
            </div>
        </form>
    )
}

export default Settings