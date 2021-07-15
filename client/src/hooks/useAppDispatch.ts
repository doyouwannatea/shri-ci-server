import { useDispatch } from 'react-redux'
import { AppDispatch } from '../state/reducers'

export const useAppDispatch = () => useDispatch<AppDispatch>()