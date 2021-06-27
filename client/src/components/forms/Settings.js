
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../../hooks/useActions'
import { toast } from 'react-toastify'
import * as settingsActions from '../../state/actions/settings'

import FormInput from './FormInput'
import Button from '../buttons/Button'

import '../../styles/settings.css'

const Settings = () => {
    const settings = useSelector(state => state.settings)
    const {
        setBranch: setBranchAction,
        setBuild: setBuildAction,
        setDuration: setDurationAction,
        setRepo: setRepoAction,
        setSettings: setSettingsAction,
        fetchSettings: fetchSettingsAction
    } = useActions(settingsActions)
    const [repo, setRepo] = useState(settings.repo)
    const [build, setBuild] = useState(settings.build)
    const [branch, setBranch] = useState(settings.branch)
    const [duration, setDuration] = useState(settings.duration)

    useEffect(() => {
        cancelSettings()
    }, [settings])

    useEffect(() => {
        return () => {
            toast.dismiss()
        }
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()

        if (settings.loading)
            return toast.info('The repository is being copied, please wait.')

        if (settings.allSettled
            && repo.trim() === settings.repo
            && build.trim() === settings.build
            && branch.trim() === settings.branch
            && parseInt(duration) === settings.duration
        ) return toast.info('These are your current settings.')

        if (repo && build && branch && duration > -1) {
            setRepoAction(repo)
            setBranchAction(branch)
            setBuildAction(build)
            setDurationAction(duration)
            try {
                toast.info('Setting preferences.')
                await setSettingsAction()
                toast.success('The settings are set.')
            } catch (error) {
                console.error(error)
                setRepoAction('')
                setBranchAction('')
                setBuildAction('')
                setDurationAction(0)
                fetchSettingsAction()
                toast.error('Setup error.')
                toast.info('Retrieving old settings.')
            }
            return
        }

        toast.error('Incorrect data entry.')
    }

    function cancelSettings() {
        setRepo(settings.repo)
        setBuild(settings.build)
        setBranch(settings.branch)
        setDuration(settings.duration)
    }

    return (
        <form onSubmit={submitHandler} className="settings">
            <FormInput
                className="settings__input"
                value={repo}
                setValue={setRepo}
                label="GitHub repository"
                placeholder="user-name/repo-name"
                required
                clearBtn />

            <FormInput
                className="settings__input"
                value={build}
                setValue={setBuild}
                label="Build command"
                placeholder="command"
                required
                clearBtn />

            <FormInput
                className="settings__input"
                value={branch}
                setValue={setBranch}
                label="Main branch"
                placeholder="branch name"
                required
                clearBtn />

            <div>
                Synchronize every
                <FormInput
                    value={String(duration)}
                    setValue={setDuration}
                    type="number"
                    short
                    inline
                    min={0} />
                minutes
            </div>

            <div className="settings__actions">
                <Button disabled={settings.loading} variant="primary">Save</Button>
                <Button disabled={settings.loading} type="button" action={cancelSettings}>Cancel</Button>
            </div>
        </form>
    )
}

export default Settings