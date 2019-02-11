import React, { PureComponent } from 'react'

export default class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <p className="page-title">Wallet</p>
      </div>
    )
  }
}
