import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Button from './Button'

import settingsIcon from '../../assets/icons/12_settings.svg'

const SettingsBtn = ({ children }) => {

    const history = useHistory()

    const toSettingsPage = () => {
        history.push('/settings')
    }

    return (
        <Button
            action={toSettingsPage}
            icon={settingsIcon}
            variant="silent"
            adaptive>
            {children}
        </Button>
    )
}

SettingsBtn.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default SettingsBtn