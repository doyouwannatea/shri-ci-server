import React from 'react'
import { ClockLoader } from 'react-spinners'

import './Loader.css'

interface LoaderProps {
    loading: boolean
}

const Loader = ({ loading }: LoaderProps) => {

    if (!loading) return null

    return (
        <div className="loader-container">
            <ClockLoader loading={loading} size={50} color="#000" />
        </div>
    )
}

export default Loader