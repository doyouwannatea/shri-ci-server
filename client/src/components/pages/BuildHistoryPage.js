import React from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../../hooks/useActions'

import Button from '../buttons/Button'
import Footer from '../Footer'
import Header from '../header/Header'
import HeaderTitle from '../header/HeaderTitle'
import SettingsBtn from '../buttons/SettingsBtn'
import BuildsContainer from '../BuildsContainer'

import * as appActions from '../../state/actions/app'

import playIcon from '../../assets/icons/12_play.svg'
import '../../styles/buildHistoryPage.css'

const BuildHistoryPage = () => {
    const { repoName, buildsList } = useSelector(state => ({
        repoName: state.settings.repo,
        buildsList: state.builds.buildsList
    }))

    const { setBuildModal } = useActions(appActions)

    const openModal = () => {
        setBuildModal(true)
    }

    return (
        <div className="page">
            <Header title={<HeaderTitle color="#000" value={repoName} />}>
                <Button
                    action={openModal}
                    variant="silent"
                    adaptive
                    icon={playIcon}>Run build</Button>
                <SettingsBtn />
            </Header>
            <main className="page__body container">
                <BuildsContainer />
                <Button disabled={!buildsList || !buildsList.length} variant="silent">Show more</Button>
            </main>
            <Footer />
        </div>
    )
}

export default BuildHistoryPage