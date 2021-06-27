import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const HeaderTitle = ({ color, value }) => {
    return (
        <h1 style={{ color: value ? color : null }} className="header__logo">
            <Link className="header__link" to="/">
                {value ? value : 'School CI server'}
            </Link>
        </h1>
    )
}

HeaderTitle.propTypes = {
    color: PropTypes.string,
    value: PropTypes.string
}

export default HeaderTitle