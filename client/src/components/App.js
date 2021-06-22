import React from 'react'
import { useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import HomePage from './pages/HomePage'
import BuildHistoryPage from './pages/BuildHistoryPage'
import BuildPage from './pages/BuildPage'
import SettingsPage from './pages/SettingsPage'
import BuildModal from './modals/BuildModal'

import '../styles/app.css'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { allSettled } = useSelector(state => state.settings)

  return (
    <>
      <BuildModal />
      <Router>
        <Switch>
          <Route path="/" exact component={allSettled ? BuildHistoryPage : HomePage} />
          <Route path="/settings" exact component={SettingsPage} />
          <Route path="/build/:buildNumber" exact component={BuildPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  )
}

export default App
