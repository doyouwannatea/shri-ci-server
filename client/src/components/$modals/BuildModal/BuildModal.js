import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import FocusTrap from 'focus-trap-react'
import { useActions } from '../../../hooks/useActions'
import { setBuildModal } from '../../../state/actions/app'
import { setBuild } from '../../../state/actions/builds'

import Button from '../../$buttons/Button'
import FormInput from '../../$forms/FormInput'

import './BuildModal.css'

const BuildModal = () => {
    const history = useHistory()
    const [hash, setHash] = useState('')
    const { isBuildModalActive, loading } = useSelector(state => ({
        isBuildModalActive: state.app.isBuildModalActive,
        loading: state.builds.loading
    }))
    const [setBuildModalAction, setBuildAction] = useActions([setBuildModal, setBuild])

    useEffect(() => {
        if (isBuildModalActive) document.body.classList.add('overflow-hidden')
        else document.body.classList.remove('overflow-hidden')

        return () => document.body.classList.remove('overflow-hidden')
    }, [isBuildModalActive])

    const closeModal = (e) => {
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
            <form onSubmit={submitHandler}>
                <div onClick={closeModal} className="background"></div>
                <div className="build-modal">
                    <div className="build-modal__title">New build</div>
                    <div className="build-modal__lead-text">
                        Enter the commit hash which you want to build
                    </div>

                    <FormInput
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
