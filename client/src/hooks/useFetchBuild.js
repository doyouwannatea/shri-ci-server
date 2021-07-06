import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { fetchBuild, fetchLogs } from "../state/actions/builds"

const useFetchBuild = (buildNumber) => {
    const [logs, setLogs] = useState('')
    const [build, setBuild] = useState(null)
    const dispatch = useDispatch()

    const history = useHistory()

    useEffect(() => {
        setBuild(null)
        setLogs('')
        fetchAsync()
    }, [buildNumber])


    async function fetchAsync() {
        try {
            const build = await dispatch(fetchBuild(buildNumber))
            setBuild(build)
        } catch (error) {
            history.push('/')
            toast.error('Couldn\'t fetch build')
        }

        try {
            const logs = await dispatch(fetchLogs(buildNumber))
            setLogs(logs)
        } catch (error) {
            toast.error('Couldn\'t fetch logs')
        }
    }

    return { logs, build }
}

export default useFetchBuild