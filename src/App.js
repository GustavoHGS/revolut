import React from 'react'
import { Route, Switch } from 'react-router-dom'
import cuid from 'cuid'
import './lib/revolutCss'
import routes from './routes'
import SideBar from './components/SideBar'
import Loading from './components/Loading'
import NoMatch from './pages/NoMatch'

const App = () => (
  <div className="app-container">
    <SideBar />
    <div className="page-container">
      <Loading />
      <Switch>
        {
          routes.map(route => (<Route key={cuid()} {...route} />))
        }
        <Route component={NoMatch} />
      </Switch>
    </div>
  </div>
)

export default App
