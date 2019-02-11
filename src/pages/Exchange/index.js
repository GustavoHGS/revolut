/* eslint react/forbid-prop-types: off */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FaExchangeAlt } from 'react-icons/fa'
import { FiTrendingUp } from 'react-icons/fi'
import get from 'lodash.get'
// import currency from 'currency.js'
import Input from 'components/Input'
import Select from 'components/Select'
import { getCurrencies } from 'helpers'
import { currencyFormater } from 'helpers/currency'
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
      this.props.fetchCurrencyRate(fromCurrency.currency, toCurrency.currency)
      return this.setState({
        toCurrency: fromCurrency,
      }, () => {
        this.setState({
          fromCurrency: value,
        })
      })
    }
    this.props.fetchCurrencyRate(value.currency, toCurrency.currency)
    return this.setState({
      fromCurrency: value,
    })
  }

  setToCurrency = (value) => {
    const { fromCurrency, toCurrency } = this.state
    if (value.currency === fromCurrency.currency) {
      this.props.fetchCurrencyRate(toCurrency.currency, value.currency)
      return this.setState({
        fromCurrency: toCurrency,
      }, () => {
        this.setState({
          toCurrency: value,
        })
      })
    }
    this.props.fetchCurrencyRate(fromCurrency.currency, value.currency)
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
    const currencyRate = get(lastRates,
      `[${fromCurrency.currency}].rates[${toCurrency.currency}]`, 0).toFixed(4)

    console.log('DKSPADKSAPDASOP ', this.state)
    return (
      <div>
        <p className="page-title">Exchange</p>
        <div className="card" style={{ width: '75%' }}>
          <div className="row currency-row">
            <div className="col">
              <Input
                className="currency-input"
                label="I have/sell"
                prefix={() => (
                  <span className="currency-prefix">{get(fromCurrency, 'prefix', '')}</span>
                )}
                onChange={(value) => {
                  const valueToFloat = value ? value.replace(/,/g, '') : 0
                  this.setState({
                    fromValue: valueToFloat ? value : 0,
                    toValue: valueToFloat
                      ? currencyFormater((parseFloat(valueToFloat) * currencyRate).toFixed(2))
                      : 0,
                  })
                }}
                placeholder={0}
                formatter={currencyFormater}
                value={fromValue}
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
                      {`${fromCurrency.prefix} 1 = ${toCurrency.prefix} ${currencyRate}`}
                    </span>
                  </span>
                )}
                primary
                style={{ position: 'absolute', top: 8 }}
              />
              <FaExchangeAlt className="exchange-icon" />
            </div>

            <div className="col">
              <Input
                className="currency-input"
                label="I want to buy"
                prefix={() => (
                  <span className="currency-prefix">{get(toCurrency, 'prefix', '')}</span>
                )}
                onChange={(value) => {
                  const valueToFloat = value ? value.replace(/,/g, '') : 0
                  this.setState({
                    toValue: valueToFloat,
                    fromValue: valueToFloat
                      ? currencyFormater((parseFloat(valueToFloat) / currencyRate).toFixed(2))
                      : 0,
                  })
                }}
                placeholder={0}
                formatter={currencyFormater}
                value={toValue}
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
