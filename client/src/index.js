import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './state/reducers'

import App from './components/App'
import './styles/index.css'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
