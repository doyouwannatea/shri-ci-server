import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import FocusTrap from 'focus-trap-react'

import { setBuildModal } from '../../../state/actions/app'
import { pushBuild } from '../../../state/actions/builds'

import Button from '../../$buttons/Button'
import FormInput from '../../$forms/FormInput'

import './BuildModal.css'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import type { CommitHash } from '../../../../../models/Build'

const BuildModal = () => {
    const isBuildModalActive = useAppSelector(state => state.app.isBuildModalActive)
    const loading = useAppSelector(state => state.builds.loading)
    const [hash, setHash] = useState<CommitHash>('')
    const dispatch = useAppDispatch()

    const history = useHistory()

    useEffect(() => {
        if (isBuildModalActive) document.body.classList.add('overflow-hidden')
        else document.body.classList.remove('overflow-hidden')

        return () => document.body.classList.remove('overflow-hidden')
    }, [isBuildModalActive])

    const closeModal = () => {
        setHash('')
        dispatch(setBuildModal(false))
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (loading) return
        if (!hash.trim()) return

        try {
            const buildId = await dispatch(pushBuild(hash.trim()))
            history.push(`build/${buildId}`)
            closeModal()
        } catch (error) {
            toast.error('Commit hash not found')
        }
    }

    if (!isBuildModalActive) return null

    return ReactDOM.createPortal(
        <FocusTrap>
            <form onSubmit={submitHandler} data-testid="build-modal-form">
                <div onClick={closeModal} className="background"></div>
                <div className="build-modal">
                    <div className="build-modal__title">New build</div>
                    <div className="build-modal__lead-text">
                        Enter the commit hash which you want to build
                    </div>

                    <FormInput
                        testId="build-modal-input"
                        value={hash}
                        setValue={setHash}
                        placeholder="Commit hash"
                        clearBtn
                    />

                    <div className="build-modal__actions">
                        <Button disabled={loading} variant="primary">Run build</Button>
                        <Button type="button" action={closeModal}>Cancel</Button>
                    </div>
                </div>
            </form>
        </FocusTrap>, document.body)
}

export default BuildModal
