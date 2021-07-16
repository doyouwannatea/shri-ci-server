import React from 'react'
import { ToastContainer } from 'react-toastify'

import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { useAppSelector } from '../../hooks/useAppSelector'

import HomePage from '../$pages/HomePage'
import BuildHistoryPage from '../$pages/BuildHistoryPage'
import BuildPage from '../$pages/BuildPage'
import SettingsPage from '../$pages/SettingsPage'
import BuildModal from '../$modals/BuildModal'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const allSettled = useAppSelector(state => state.settings.allSettled)

  return (
    <div data-testid="app-page">
      <ToastContainer pauseOnHover={false} />
      <BuildModal />
      <Switch>
        <Route path="/" exact component={allSettled ? BuildHistoryPage : HomePage} />
        <Route path="/settings" exact component={SettingsPage} />
        <Route path="/build/:buildId" exact component={BuildPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default App
