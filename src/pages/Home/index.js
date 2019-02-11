import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <p className="page-title">Wallet</p>
        <Link to="/exchange" style={{ marginLeft: 16 }}>
          <span>Go to exchange</span>
        </Link>
      </div>
    )
  }
}
