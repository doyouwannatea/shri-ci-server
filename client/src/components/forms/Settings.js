
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../../hooks/useActions'
import { ToastContainer, toast } from 'react-toastify';
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
        settle: settleAction
    } = useActions(settingsActions)
    const [repo, setRepo] = useState(settings.repo)
    const [build, setBuild] = useState(settings.build)
    const [branch, setBranch] = useState(settings.branch)
    const [duration, setDuration] = useState(settings.duration)

    const submitHandler = (e) => {
        e.preventDefault()
        if (repo === settings.repo
            && build === settings.build
            && branch === settings.branch
            && duration === settings.duration
        ) return toast.info('Это ваши текущие настройки')

        if (repo && build && duration > -1) {
            setRepoAction(repo)
            setBranchAction(branch)
            setBuildAction(build)
            setDurationAction(duration)
            settleAction()
            return toast.success('Настройки сохранены!')
        }

        toast.error('Неправильный ввод данных')
    }

    const cancelHandler = (e) => {
        e.preventDefault()
        setRepo('')
        setBuild('')
        setBranch('')
        setDuration('')
    }

    return (
        <>
            <ToastContainer />

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
                    clearBtn />

                <div>
                    Synchronize every
                    <FormInput
                        value={duration}
                        setValue={setDuration}
                        type="number"
                        short
                        inline
                        min={0} />
                    minutes
                </div>

                <div className="settings__actions">
                    <Button action={() => { }} type="primary">Save</Button>
                    <Button action={cancelHandler}>Cancel</Button>
                </div>
            </form>
        </>
    )
}

export default Settings