import React from 'react'
import { useSelector } from 'react-redux'
import { useActions, useFetchBuilds } from '../../../hooks'

import Button from '../../$buttons/Button'
import Footer from '../../Footer'
import Header from '../../$header/Header'
import HeaderTitle from '../../$header/HeaderTitle'
import SettingsBtn from '../../$buttons/SettingsBtn'
import BuildsContainer from '../../BuildsContainer/BuildsContainer'

import * as appActions from '../../../state/actions/app'
import * as buildsActions from '../../../state/actions/builds'

import playIcon from '../../../assets/icons/12_play.svg'

const BuildHistoryPage = () => {
    useFetchBuilds()
    const repoName = useSelector(state => state.settings.repo)
    const buildsList = useSelector(state => state.builds.buildsList)

    const {
        setBuildModal,
        fetchBuilds,
        increaseQuantity
    } = useActions({ ...appActions, ...buildsActions })

    const openModal = () => {
        setBuildModal(true)
    }

    const onShowMoreClick = async () => {
        try {
            increaseQuantity()
            await fetchBuilds()
        } catch (error) {
            console.error(error)
        }
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
                <Button
                    testId="show-more-btn"
                    action={onShowMoreClick}
                    disabled={!buildsList || !buildsList.length}
                    variant="silent">Show more</Button>
            </main>
            <Footer />
        </div>
    )
}

export default BuildHistoryPage