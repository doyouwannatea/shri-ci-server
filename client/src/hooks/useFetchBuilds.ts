import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { fetchBuilds, setBuilds } from '../state/actions/builds'
import { useAppDispatch } from './useAppDispatch'

const useFetchBuilds = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        async function fetchAsync() {
            try {
                await dispatch(fetchBuilds())
            } catch (error) {
                console.error(error)
                dispatch(setBuilds([]))
                toast.error('Builds list fetching error.')
            }
        }

        fetchAsync()
    }, [dispatch])
}

export default useFetchBuilds