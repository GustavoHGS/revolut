/* eslint react/forbid-prop-types: off */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Modal } from 'antd'
import { FaExchangeAlt, FaLongArrowAltRight } from 'react-icons/fa'
import { FiTrendingUp } from 'react-icons/fi'
import get from 'lodash.get'
import Input from 'components/Input'
import Select from 'components/Select'
import { getCurrencies } from 'helpers'
import { currencyFormatter, removeCommas } from 'helpers/currency'
import CurrencyOption from 'components/Select/components/CurrencyOption'
import Chip from 'components/Chip'
import Button from 'components/Button'
import LineChart from './components/LineChart'
import {
  startPollCurrencyTask,
  confirmExchange,
  stopPollCurrencyTask,
} from './actions'
import { getCurrencyBalance, getLastRates } from './selectors'
import './styles.scss'

const { confirm } = Modal

class Exchange extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fakeHistoricalData: [[1.0823, 1.113, 1.1002, 1.0990, 1.1011, 0.9891, 1.0212, 1.3102]],
      fromValue: '0',
      toValue: '0',
      fromCurrency: getCurrencies()[0],
      toCurrency: getCurrencies()[1],
      fromBalance: this.props.balances[getCurrencies()[0].currency],
      toBalance: this.props.balances[getCurrencies()[1].currency],
      lastUpdatedAt: '-',
    }
  }

  componentWillMount() {
    const { fromCurrency, toCurrency } = this.state
    this.props.startPollCurrencyTask(fromCurrency.currency, toCurrency.currency)
  }

  componentWillReceiveProps(nextProps) {
    const { currentRate, fromCurrency, toCurrency } = this.state

    const propsRate = get(nextProps.lastRates,
      `[${fromCurrency.currency}].rates[${toCurrency.currency}]`, 0).toFixed(4)
    const propsUpdateTime = get(nextProps.lastRates,
      `[${fromCurrency.currency}].lastUpdatedAt`, '-')

    const fromBalance = nextProps.balances[fromCurrency.currency]
    const toBalance = nextProps.balances[toCurrency.currency]

    if (currentRate !== propsRate) {
      this.setState(prevState => ({
        currentRate: propsRate,
        toValue: currencyFormatter((parseFloat(removeCommas(prevState.fromValue))
        * parseFloat(removeCommas(propsRate))).toFixed(2)),
      }))
    }
    if (propsUpdateTime !== this.state.lastUpdatedAt) {
      this.setState({
        lastUpdatedAt: propsUpdateTime,
      })
    }

    if (fromBalance !== this.state.fromBalance) {
      this.setState({
        fromBalance,
      })
    }
    if (toBalance !== this.state.toBalance) {
      this.setState({
        toBalance,
      })
    }
  }

  componentWillUnmount() {
    this.props.stopPollCurrencyTask()
  }

  handleShowConfirmExchange = () => {
    const localConfirm = this.props.confirmExchange
    const resetState = () => this.setState({
      fromValue: '0',
      toValue: '0',
    })
    const {
      fromValue, toValue, fromCurrency, toCurrency,
    } = this.state
    confirm({
      title: 'Confirm exchange?',
      content: 'Are you sure you want to proceed with this operation?',
      onOk() {
        localConfirm(fromCurrency.currency, fromValue, toCurrency.currency, toValue)
        resetState()
      },
      onCancel() {
      },
      okText: 'Yes',
      cancelText: 'No',
    })
  }

  setFromCurrency = (value) => {
    const { fromCurrency, toCurrency } = this.state
    this.props.startPollCurrencyTask(value.currency, toCurrency.currency)
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
      this.props.startPollCurrencyTask(toCurrency.currency, value.currency)
      return this.setState({
        fromCurrency: toCurrency,
      }, () => {
        this.setState({
          toCurrency: value,
        })
      })
    }
    this.props.startPollCurrencyTask(fromCurrency.currency, value.currency)
    return this.setState({
      toCurrency: value,
    })
  }

  renderOption = option => (
    <CurrencyOption currency={option.currency} />
  )

  renderChartTitle = () => {
    const { fromCurrency, toCurrency, currentRate } = this.state
    return (
      <div className="chart-title" style={{ display: 'flex', alignItems: 'center' }}>
        <span>
          1
          <span style={{ marginLeft: 8 }}>{fromCurrency.currency}</span>
        </span>
        <FaLongArrowAltRight style={{ margin: 8 }} />
        <span>
          {currentRate}
          <span style={{ marginLeft: 8 }}>{toCurrency.currency}</span>
        </span>
      </div>
    )
  }

  renderBalanceOperator = (type) => {
    const {
      fromBalance, toBalance, fromValue, toValue,
      fromCurrency, toCurrency,
    } = this.state

    const fromBalanceP = fromBalance.toFixed(2)
    const toBalanceP = toBalance.toFixed(2)
    const fromValueP = parseFloat(removeCommas(fromValue))
    const toValueP = parseFloat(removeCommas(toValue))

    if (type === 'from') {
      if (Number(fromValueP) === 0) return null
    } else if (Number(toValueP) === 0) return null


    const balanceToShow = type === 'from'
      ? (parseFloat(fromBalanceP) - parseFloat(fromValueP)).toFixed(2)
      : (parseFloat(toBalanceP) + parseFloat(toValueP)).toFixed(2)
    const hasError = parseFloat(fromValueP) > parseFloat(fromBalanceP) && type === 'from'
    return (
      <span className={classNames('chip-balance-amount', hasError ? 'balance-error' : '')}>
        <FaLongArrowAltRight style={{ marginLeft: 8, marginRight: 8 }} />
        {type === 'from' ? `${fromCurrency.prefix} ${currencyFormatter(balanceToShow)}`
          : `${toCurrency.prefix} ${currencyFormatter(balanceToShow)}`}
      </span>
    )
  }

  render() {
    const {
      fromCurrency, fromValue, toCurrency, toValue, currentRate, lastUpdatedAt,
      fromBalance, toBalance,
    } = this.state

    return (
      <div>
        <p className="page-title">Exchange</p>
        <div className="card" style={{ width: 'fit-content' }}>
          <div className="row currency-row">
            <div className="col">
              <Input
                className="currency-input"
                labelStyle={{ marginLeft: 30 }}
                label="I have/sell"
                prefix={() => (
                  <span className="currency-prefix">{get(fromCurrency, 'prefix', '')}</span>
                )}
                onChange={(value) => {
                  const valueToFloat = value ? removeCommas(value) : 0
                  this.setState({
                    fromValue: valueToFloat ? value : 0,
                    toValue: valueToFloat
                      ? currencyFormatter((parseFloat(valueToFloat) * currentRate).toFixed(2))
                      : 0,
                  })
                }}
                placeholder={0}
                formatter={currencyFormatter}
                value={fromValue}
                maxLength={12} // max exchange to 9,999,999.99
              />
              <div className="chip-balance-container">
                <Chip label={`Balance: ${fromCurrency.prefix} ${fromBalance}`} />
                {this.renderBalanceOperator('from')}
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
                      {`${fromCurrency.prefix} 1 = ${toCurrency.prefix} ${currentRate}`}
                    </span>
                  </span>
                )}
                primary
                style={{ position: 'absolute', top: 12 }}
              />
              <FaExchangeAlt className="exchange-icon" />
              <div style={{
                position: 'absolute', top: 108, display: 'grid', textAlign: 'center',
              }}
              >
                <span className="time-label">last updated at:</span>
                <span className="time-data">{lastUpdatedAt}</span>
              </div>
            </div>

            <div className="col">
              <Input
                className="currency-input"
                labelStyle={{ marginLeft: 30 }}
                label="I want to buy"
                prefix={() => (
                  <span className="currency-prefix">{get(toCurrency, 'prefix', '')}</span>
                )}
                onChange={(value) => {
                  const valueToFloat = value ? removeCommas(value) : 0
                  this.setState({
                    toValue: valueToFloat ? value : 0,
                    fromValue: valueToFloat
                      ? currencyFormatter((parseFloat(valueToFloat) / currentRate).toFixed(2))
                      : 0,
                  })
                }}
                placeholder={0}
                formatter={currencyFormatter}
                value={toValue}
                maxLength={12} // max exchange to 9,999,999.99
              />
              <div className="chip-balance-container">
                <Chip label={`Balance: ${toCurrency.prefix} ${toBalance}`} />
                {this.renderBalanceOperator()}
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
                disabled={
                  (!fromValue || !toValue) || Number(removeCommas(fromValue)) === 0
                  || (parseFloat(removeCommas(fromValue)) > parseFloat(fromBalance))
                }
                onClick={this.handleShowConfirmExchange}
              />
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <LineChart
              yLabel={['FX History (Fake sample)']}
              data={this.state.fakeHistoricalData}
              rendertitle={this.renderChartTitle}
            />
          </div>

        </div>
        <br />
        <br />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lastRates: getLastRates(state),
  balances: getCurrencyBalance(state),
})

const mapActionsToProps = dispatch => ({
  startPollCurrencyTask(baseCurrency, tradeCurrency) {
    dispatch(startPollCurrencyTask(baseCurrency, tradeCurrency))
  },
  confirmExchange(baseCurrency, amountToSell, tradeCurrency, amountToBuy) {
    dispatch(confirmExchange(baseCurrency, amountToSell, tradeCurrency, amountToBuy))
  },
  stopPollCurrencyTask() {
    dispatch(stopPollCurrencyTask())
  },
})

export default connect(mapStateToProps, mapActionsToProps)(Exchange)

Exchange.propTypes = {
  lastRates: PropTypes.object,
  startPollCurrencyTask: PropTypes.func,
  balances: PropTypes.object,
  confirmExchange: PropTypes.func,
  stopPollCurrencyTask: PropTypes.func,
}

Exchange.defaultProps = {
  lastRates: {},
  startPollCurrencyTask: () => {},
  balances: {},
  confirmExchange: () => {},
  stopPollCurrencyTask: () => {},
}
