import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import FocusTrap from 'focus-trap-react'
import { useActions } from '../../hooks/useActions'
import { setBuildModal } from '../../state/actions/app'

import Button from '../buttons/Button'
import FormInput from '../forms/FormInput'

import '../../styles/buildModal.css'

const BuildModal = () => {
    const [hash, setHash] = useState('')
    const isBuildModalActive = useSelector(state => state.app.isBuildModalActive)
    const [setBuildModalAction] = useActions([setBuildModal])

    useEffect(() => {
        if (isBuildModalActive) document.body.classList.add('overflow-hidden')
        else document.body.classList.remove('overflow-hidden')

        return () => document.body.classList.remove('overflow-hidden')
    }, [isBuildModalActive])

    const closeModal = () => {
        setHash('')
        setBuildModalAction(false)
    }

    if (!isBuildModalActive) return null

    return ReactDOM.createPortal(
        <FocusTrap>
            <div>
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
                        <Button type="primary">Run build</Button>
                        <Button action={closeModal}>Cancel</Button>
                    </div>
                </div>
            </div>
        </FocusTrap>, document.body)
}

export default BuildModal
