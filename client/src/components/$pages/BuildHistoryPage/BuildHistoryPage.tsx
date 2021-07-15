import React from 'react'
import { useFetchBuilds } from '../../../hooks'

import Button from '../../$buttons/Button'
import Footer from '../../Footer'
import Header from '../../$header/Header'
import HeaderTitle from '../../$header/HeaderTitle'
import SettingsBtn from '../../$buttons/SettingsBtn'
import BuildsContainer from '../../BuildsContainer/BuildsContainer'

import { setBuildModal } from '../../../state/actions/app'
import { fetchBuilds, increaseQuantity } from '../../../state/actions/builds'

import playIcon from '../../../assets/icons/12_play.svg'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

const BuildHistoryPage = () => {
    useFetchBuilds()
    const repoName = useAppSelector(state => state.settings.settings.repoName)
    const buildsList = useAppSelector(state => state.builds.buildsList)
    const dispatch = useAppDispatch()

    const openModal = () => {
        dispatch(setBuildModal(true))
    }

    const onShowMoreClick = async () => {
        try {
            dispatch(increaseQuantity())
            await dispatch(fetchBuilds())
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="page">
            <Header title={<HeaderTitle color="#000" title={repoName} />}>
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