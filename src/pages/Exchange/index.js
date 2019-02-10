import React, { PureComponent } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import get from 'lodash.get'
import Input from 'components/Input'
import Select from 'components/Select'
import { getCurrencies } from 'helpers'
import CurrencyOption from 'components/Select/components/CurrencyOption'
import Chip from 'components/Chip'
import Button from 'components/Button'
import './styles.scss'


export default class Exchange extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      fromValue: 0,
      fromCurrency: getCurrencies()[0],
      toCurrency: getCurrencies()[1],
    }
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
    const { fromCurrency, fromValue, toCurrency, toValue } = this.state
    return (
      <div>
        Exchange
        <div className="card" style={{ width: '70%' }}>
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
            <FaExchangeAlt className="exchange-icon" />

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
