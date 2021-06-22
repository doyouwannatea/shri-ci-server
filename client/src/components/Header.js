import React from 'react'
import PropTypes from 'prop-types'

import '../styles/header.css'

const Header = ({ children, title }) => {
    return (
        <header className="header container">
            {title}
            <div className="header__actions">
                {children}
            </div>
        </header>
    )
}

Header.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    title: PropTypes.element.isRequired
}

export default Header