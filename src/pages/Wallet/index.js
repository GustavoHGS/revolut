import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrencies } from 'helpers'
import './styles.scss'

class Wallet extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderFlag = (currency) => {
    const flagClass = `currency-flag currency-flag-lg currency-flag-${currency.toLowerCase()}`
    return (
      <div className="row" style={{ alignItems: 'center' }}>
        <span className={flagClass} />
        <span className="currency-label">{currency}</span>
      </div>
    )
  }

  render() {
    const { balance } = this.props
    return (
      <div>
        <p className="page-title">Wallet</p>
        <br />
        <h2 style={{ fontFamily: 'GloberSemiBold' }}>Balance</h2>
        <div className="row">
          {
            getCurrencies().map(fx => (
              <div className="card" style={{ margin: 12 }}>
                <span>{this.renderFlag(fx.currency)}</span>
                <span className="balance-currency-label">
                  {`${fx.prefix} ${balance[fx.currency]}`}
                </span>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  balance: state.wallet.balance,
})

export default connect(mapStateToProps)(Wallet)

Wallet.propTypes = {
  balance: PropTypes.object,
}

Wallet.defaultProps = {
  balance: {},
}
