import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useActions } from '../../hooks/useActions'
import * as buildsActions from '../../state/actions/builds'

import Build from '../Build/Build'
import Loader from '../Loader/Loader'

import './BuildsContainer.css'

const BuildsContainer = () => {
    const history = useHistory()
    const buildsList = useSelector(state =>
        state.builds.buildsList
    )
    const { fetchBuilds, setBuilds } = useActions(buildsActions)

    useEffect(() => {
        getBuildsList()
    }, [])

    async function getBuildsList() {
        try {
            toast.info('Fetching builds list.')
            await fetchBuilds()
            toast.success('Builds list fetched.')
        } catch (error) {
            console.error(error)
            setBuilds([])
            toast.error('Builds list fetching error.')
        }
    }

    const onCommitClick = build => () => {
        history.push(`/build/${build.id}`)
    }

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