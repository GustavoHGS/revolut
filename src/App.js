import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import cuid from 'cuid'
import history from './history'
import routes from './routes'
import './lib/revolutCss'
import SideBar from './components/SideBar'

const App = () => (
  <Router history={history}>
    <div className="app-container">
      <SideBar />
      <div className="page-container">
        <Switch>
          {
            routes.map(route => (<Route key={cuid()} {...route} />))
          }
        </Switch>
      </div>
    </div>
  </Router>
)

export default App
