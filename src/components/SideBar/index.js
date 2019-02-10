import React from 'react'
import { GiWallet } from 'react-icons/gi'
import { FaExchangeAlt, FaChartLine } from 'react-icons/fa'
import { NavLink, withRouter } from 'react-router-dom'
import './styles.scss'

const SideBar = () => (
  <div className="side-bar-container">
    <NavLink to="/" exact className="button-container">
      <GiWallet className="side-bar-icon" />
      <span className="button-text">Wallet</span>
    </NavLink>
    <NavLink to="/exchange" className="button-container">
      <FaExchangeAlt className="side-bar-icon" />
      <span className="button-text">Exchange</span>
    </NavLink>
    <NavLink to="/analytics" className="button-container">
      <FaChartLine className="side-bar-icon" />
      <span className="button-text">Analytics</span>
    </NavLink>

  </div>
)

export default withRouter(SideBar)
