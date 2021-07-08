import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Build from '../Build/Build'
import Loader from '../Loader/Loader'

import './BuildsContainer.css'

const BuildsContainer = () => {
    const history = useHistory()
    const buildsList = useSelector(state => state.builds.buildsList)

    const onBuildClick = build => () => {
        history.push(`/build/${build.id}`)
    }

    if (!buildsList) return <Loader loading />
    if (!buildsList.length) return <div className="builds-placeholder">Builds not found</div>

    return (
        <div className="builds-container">
            {
                buildsList.map(build =>
                    <Build
                        key={build.id}
                        onClick={onBuildClick(build)}
                        {...build} />
                )
            }
        </div>
    )
}

export default BuildsContainer