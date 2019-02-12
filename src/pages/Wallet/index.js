import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cuid from 'cuid'
import { getCurrencies } from 'helpers'
import './styles.scss'
import { currencyFormatter } from 'helpers/currency'

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
              <div className="card balance-card" key={cuid()}>
                <span>{this.renderFlag(fx.currency)}</span>
                <span className="balance-currency-label">
                  {`${fx.prefix} ${currencyFormatter(balance[fx.currency].toFixed(2))}`}
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
