import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import FocusTrap from 'focus-trap-react'
import { setBuildModal } from '../../../state/actions/app'
import { setBuild } from '../../../state/actions/builds'

import Button from '../../$buttons/Button'
import FormInput from '../../$forms/FormInput'

import { useActions } from '../../../hooks'

import './BuildModal.css'

const BuildModal = () => {
    const isBuildModalActive = useSelector(state => state.app.isBuildModalActive)
    const loading = useSelector(state => state.builds.loading)
    const [hash, setHash] = useState('')

    const {
        setBuildModal: setBuildModalAction,
        setBuild: setBuildAction
    } = useActions({ setBuildModal, setBuild })

    const history = useHistory()

    useEffect(() => {
        if (isBuildModalActive) document.body.classList.add('overflow-hidden')
        else document.body.classList.remove('overflow-hidden')

        return () => document.body.classList.remove('overflow-hidden')
    }, [isBuildModalActive])

    const closeModal = () => {
        setHash('')
        setBuildModalAction(false)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if (loading) return
        if (!hash.trim()) return

        try {
            const buildId = await setBuildAction(hash.trim())
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
