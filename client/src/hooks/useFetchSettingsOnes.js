import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchSettings } from '../state/actions/settings'

const useFetchSettingsOnes = () => {
    const allSettled = useSelector(state => state.settings.allSettled)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!allSettled) {
            fetchAsync()
        }
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
export default useFetchSettingsOnes