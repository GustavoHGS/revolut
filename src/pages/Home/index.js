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
        <div>Home</div>
        <Link to="/exchange" style={{ marginLeft: 16 }}>
          <span>Go to exchange</span>
        </Link>
      </div>
    )
  }
}
