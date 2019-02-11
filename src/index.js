/* global document */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import history from './history'
import store from './store'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App store={store} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
)

module.hot.accept()
