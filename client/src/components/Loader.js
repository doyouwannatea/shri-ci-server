import React from 'react'
import PropTypes from 'prop-types'
import { ClockLoader } from 'react-spinners'

import '../styles/loader.css'

const Loader = ({ loading }) => {

    if (!loading) return null

    return (
        <div className="loader-container">
            <ClockLoader loading={loading} size={50} color="#000" />
        </div>
    )
}

Loader.propTypes = {
    loading: PropTypes.bool.isRequired
}

export default Loader