import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchSettings } from '../state/actions/settings'

const useFetchSettings = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        fetchAsync()
    }, [])

    async function fetchAsync() {
        try {
            toast.info('Getting set up.')
            await dispatch(fetchSettings())
            toast.success('The settings are set.')
        } catch (error) {
            console.error(error)
            toast.error('Setup error.')
        }
    }
}
export default useFetchSettings