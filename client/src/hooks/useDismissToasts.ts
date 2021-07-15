import { useEffect } from 'react'
import { toast } from 'react-toastify'

const useDismissToasts = (deps?: any[]): void => {
    useEffect(() => {
        return () => {
            toast.dismiss()
        }
    }, deps ? [...deps] : [])
}

export default useDismissToasts