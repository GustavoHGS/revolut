import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import cuid from 'cuid'
import history from './history'
import routes from './routes'

const App = () => (
  <Router history={history}>
    <Switch>
      {
        routes.map(route => (<Route key={cuid()} {...route} />))
      }
    </Switch>
  </Router>
)

export default App
