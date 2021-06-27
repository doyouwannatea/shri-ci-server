import React from 'react'
import { useHistory } from 'react-router-dom'

import Header from '../header/Header'
import Footer from '../Footer'
import Button from '../buttons/Button'

import SettingsBtn from '../buttons/SettingsBtn'
import HeaderTitle from '../header/HeaderTitle'

import logoIcon from '../../assets/icons/logo.svg'
import '../../styles/homePage.css'

const HomePage = () => {

    const history = useHistory()

    const toSettingsPage = () => {
        history.push('/settings')
    }

    return (
        <div className="home-page page">
            <Header title={<HeaderTitle />}>
                <SettingsBtn>
                    Settings
                </SettingsBtn>
            </Header>
            <main className="home-page__body page__body">
                <img className="home-page__img" src={logoIcon} alt="" />
                <p className="home-page__lead-text">
                    Configure repository connection <br />
                    and synchronization settings
                </p>
                <Button action={toSettingsPage} variant="primary">
                    Open settings
                </Button>
            </main>
            <Footer />
        </div>
    )
}

export default HomePage