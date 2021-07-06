import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { fetchBuilds, setBuilds } from "../state/actions/builds"

const useFetchBuilds = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        fetchAsync()
    }, [])

    async function fetchAsync() {
        try {
            await dispatch(fetchBuilds())
        } catch (error) {
            console.error(error)
            dispatch(setBuilds([]))
            toast.error('Builds list fetching error.')
        }
    }
}

export default useFetchBuilds