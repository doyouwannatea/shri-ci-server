import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { fetchSettings } from '../state/actions/settings'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

const useFetchSettingsOnes = (): void => {
    const allSettled = useAppSelector(state => state.settings.allSettled)
    const dispatch = useAppDispatch()

    useEffect(() => {
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

        if (!allSettled) {
            fetchAsync()
        }
    }, [])

}
export default useFetchSettingsOnes