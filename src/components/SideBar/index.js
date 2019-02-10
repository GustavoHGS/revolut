import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import './styles.scss'

const SideBar = () => (
  <div className="side-bar-container">
    <NavLink to="/exchange">
      <span>exchange</span>
    </NavLink>

  </div>
)

export default withRouter(SideBar)
