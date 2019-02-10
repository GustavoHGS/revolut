import React, { PureComponent } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import get from 'lodash.get'
import Input from 'components/Input'
import Select from 'components/Select'
import { getCurrencies } from 'helpers'
import CurrencyOption from 'components/Select/components/CurrencyOption'
import Chip from '../../components/Chip'
import './styles.scss'


export default class Exchange extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      fromValue: 0,
      fromCurrency: getCurrencies()[0],
    }
  }

  setFromCurrency = (value) => {
    this.setState({
      fromCurrency: value,
    })
  }

  renderOption = option => (
    <CurrencyOption currency={option.currency} />
  )

  render() {
    const { fromCurrency, fromValue } = this.state
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
              defaultValue={getCurrencies()[0]}
              isClearable={false}
              formatOptionLabel={this.renderOption}
              onChange={this.setFromCurrency}
            />
            <FaExchangeAlt className="exchange-icon" />

            <div className="col">
              <Input
                className="currency-input"
                type="number"
                label="I want to buy"
                prefix={() => (
                  <span className="currency-prefix">{get(fromCurrency, 'prefix', '')}</span>
                )}
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
              defaultValue={getCurrencies()[0]}
              isClearable={false}
              formatOptionLabel={this.renderOption}
              onChange={this.setFromCurrency}
            />
          </div>


        </div>
      </div>
    )
  }
}
