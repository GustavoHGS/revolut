import React from 'react'
import { Route, Switch } from 'react-router-dom'
import cuid from 'cuid'
import routes from './routes'
import './lib/revolutCss'
import SideBar from './components/SideBar'

const App = () => (
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
)

export default App
