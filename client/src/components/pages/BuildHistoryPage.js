import React from 'react'
import { useActions } from '../../hooks/useActions'

import Button from '../buttons/Button'
import Footer from '../Footer'
import Header from '../Header'
import Commit from '../Commit'
import SettingsBtn from '../buttons/SettingsBtn'

import { setBuildModal } from '../../state/actions/app'

import playIcon from '../../assets/icons/12_play.svg'
import '../../styles/buildHistoryPage.css'

const BuildHistoryPage = () => {
    const [setBuildModalAction] = useActions([setBuildModal])

    const openModal = () => {
        setBuildModalAction(true)
    }

    return (
        <div className="build-history-page page">
            <Header title={<h1>philip1967/my-awesome-repo</h1>}>
                <Button
                    action={openModal}
                    type="silent"
                    adaptive
                    icon={playIcon}>Run build</Button>
                <SettingsBtn />
            </Header>
            <main className="build-history-page__body page__body container">
                <div className="commits-container">
                    <Commit status="success" />
                    <Commit status="waiting" />
                    <Commit status="fail" />
                </div>
                <Button type="silent">Show more</Button>
            </main>
            <Footer />
        </div>
    )
}

export default BuildHistoryPage