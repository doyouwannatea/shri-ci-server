import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ID } from '../models'
import { BuildItem } from '../models/Build'
import { fetchBuild, fetchLogs } from '../state/actions/builds'
import { useAppDispatch } from './useAppDispatch'

const useFetchBuild = (buildId: ID) => {
    const [logs, setLogs] = useState('')
    const [build, setBuild] = useState<BuildItem | null>(null)
    const dispatch = useAppDispatch()

    const history = useHistory()

    useEffect(() => {
        async function fetchAsync() {
            try {
                const build = await dispatch(fetchBuild(buildId))
                setBuild(build)
            } catch (error) {
                history.push('/')
                toast.error('Couldn\'t fetch build')
            }

            try {
                const logs = await dispatch(fetchLogs(buildId))
                setLogs(logs)
            } catch (error) {
                toast.error('Couldn\'t fetch logs')
            }
        }

        setBuild(null)
        setLogs('')
        fetchAsync()
    }, [buildId, dispatch, history])

    return { logs, build }
}

export default useFetchBuild