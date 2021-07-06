import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useFetchBuilds } from '../../hooks'

import Build from '../Build/Build'
import Loader from '../Loader/Loader'

import './BuildsContainer.css'

const BuildsContainer = () => {
    useFetchBuilds()
    const history = useHistory()
    const buildsList = useSelector(state => state.builds.buildsList)

    const onCommitClick = useCallback(build => () => {
        history.push(`/build/${build.id}`)
    }, [history])

    if (!buildsList) return <Loader loading />
    if (!buildsList.length) return <div className="builds-placeholder">Builds not found</div>

    return (
        <div className="commits-container">
            {
                buildsList.map(build =>
                    <Build
                        key={build.id}
                        onClick={onCommitClick(build)}
                        {...build} />
                )
            }
        </div>
    )
}

export default BuildsContainer