/* eslint react/forbid-prop-types: off */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FaExchangeAlt } from 'react-icons/fa'
import { FiTrendingUp } from 'react-icons/fi'
import get from 'lodash.get'
import Input from 'components/Input'
import Select from 'components/Select'
import { getCurrencies } from 'helpers'
import CurrencyOption from 'components/Select/components/CurrencyOption'
import Chip from 'components/Chip'
import Button from 'components/Button'
import { fetchCurrencyRate } from './actions'
import { getLastRates } from './selectors'
import './styles.scss'


class Exchange extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      fromValue: 0,
      toValue: 0,
      fromCurrency: getCurrencies()[0],
      toCurrency: getCurrencies()[1],
    }
  }

  componentWillMount() {
    const { fromCurrency, toCurrency } = this.state
    this.props.fetchCurrencyRate(fromCurrency.currency, toCurrency.currency)
  }

  setFromCurrency = (value) => {
    const { fromCurrency, toCurrency } = this.state
    if (value.currency === toCurrency.currency) {
      return this.setState({
        toCurrency: fromCurrency,
      }, () => {
        this.setState({
          fromCurrency: value,
        })
      })
    }
    return this.setState({
      fromCurrency: value,
    })
  }

  setToCurrency = (value) => {
    const { fromCurrency, toCurrency } = this.state
    if (value.currency === fromCurrency.currency) {
      return this.setState({
        fromCurrency: toCurrency,
      }, () => {
        this.setState({
          toCurrency: value,
        })
      })
    }
    return this.setState({
      toCurrency: value,
    })
  }

  renderOption = option => (
    <CurrencyOption currency={option.currency} />
  )

  render() {
    const {
      fromCurrency, fromValue, toCurrency, toValue,
    } = this.state
    const {
      lastRates,
    } = this.props
    return (
      <div>
        <p className="page-title">Exchange</p>
        <div className="card" style={{ width: '75%' }}>
          <div className="row currency-row">
            <div className="col">
              <Input
                className="currency-input"
                type="number"
                label="I have/sell"
                prefix={() => (
                  <span className="currency-prefix">{get(fromCurrency, 'prefix', '')}</span>
                )}
                value={fromValue}
                onChange={value => this.setState({ fromValue: value })}
              />
              <div style={{ marginLeft: 32 }}>
                <Chip label="Balance: $10.00" />
              </div>
            </div>
            <Select
              className="currency-select"
              classNamePrefix="select"
              style={{ minHeight: 40 }}
              data={getCurrencies()}
              name="currency"
              defaultValue={fromCurrency}
              isClearable={false}
              formatOptionLabel={this.renderOption}
              onChange={this.setFromCurrency}
              value={fromCurrency}
            />
            <div className="switch-container">
              <Chip
                content={() => (
                  <span>
                    <FiTrendingUp className="trendind-icon" />
                    <span style={{ marginLeft: 8, fontSize: '1rem' }}>
                      {`${fromCurrency.prefix} 1 = ${toCurrency.prefix} ${
                        lastRates[fromCurrency.currency].rates[toCurrency.currency].toFixed(4)
                      }`}
                    </span>
                  </span>
                )}
                primary
              />
              <FaExchangeAlt className="exchange-icon" />
            </div>

            <div className="col">
              <Input
                className="currency-input"
                type="number"
                label="I want to buy"
                prefix={() => (
                  <span className="currency-prefix">{get(toCurrency, 'prefix', '')}</span>
                )}
                value={toValue}
                onChange={value => this.setState({ toValue: value })}
              />
              <div style={{ marginLeft: 32 }}>
                <Chip label="Balance: $10.00" />
              </div>
            </div>
            <Select
              className="currency-select"
              classNamePrefix="select"
              style={{ minHeight: 40 }}
              data={getCurrencies()}
              name="currency"
              defaultValue={toCurrency}
              isClearable={false}
              formatOptionLabel={this.renderOption}
              onChange={this.setToCurrency}
              value={toCurrency}
            />

            <div style={{ marginLeft: 16 }}>
              <Button
                label="Exchange"
                className="large"
                disabled={!fromValue || !toValue}
              />
            </div>
          </div>


        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lastRates: getLastRates(state),
})

const mapActionsToProps = dispatch => ({
  fetchCurrencyRate(baseCurrency, tradeCurrency) {
    dispatch(fetchCurrencyRate(baseCurrency, tradeCurrency))
  },
})

export default connect(mapStateToProps, mapActionsToProps)(Exchange)

Exchange.propTypes = {
  fetchCurrencyRate: PropTypes.func,
  lastRates: PropTypes.object,
}

Exchange.defaultProps = {
  fetchCurrencyRate: () => {},
  lastRates: {},
}
