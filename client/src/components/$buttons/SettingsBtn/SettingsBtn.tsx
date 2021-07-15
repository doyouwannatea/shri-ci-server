import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../Button'
import settingsIcon from '../../../assets/icons/12_settings.svg'

interface SettingsBtnProps {
    children?: React.ReactNode
}

const SettingsBtn = ({ children }: SettingsBtnProps) => {

    const history = useHistory()

    const toSettingsPage = () => {
        history.push('/settings')
    }

    return (
        <Button
            testId="settings-btn"
            action={toSettingsPage}
            icon={settingsIcon}
            variant="silent"
            adaptive>
            {children}
        </Button>
    )
}


export default SettingsBtn