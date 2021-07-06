import React from 'react'

import Footer from '../../Footer'
import Header from '../../$header/Header'
import HeaderTitle from '../../$header/HeaderTitle'
import Settings from '../../$forms/Settings'
import { useFetchSettingsOnes } from '../../../hooks'

import './SettingsPage.css'

const SettingsPage = () => {
    useFetchSettingsOnes()

    return (
        <div className="page settings-page">
            <Header title={<HeaderTitle />} />
            <main className="page__body container">
                <h2 className="settings-page__title"><b>Settings</b></h2>
                <p className="settings-page__lead-text">Configure repository connection and synchronization settings.</p>
                <Settings />
            </main>
            <Footer />
        </div>
    )
}

export default SettingsPage