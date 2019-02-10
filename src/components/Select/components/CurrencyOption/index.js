import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'


const CurrencyOption = ({ currency }) => {
  const flagClass = `currency-flag currency-flag-lg currency-flag-${currency.toLowerCase()}`
  return (
    <div className="row" style={{ alignItems: 'center' }}>
      <span className={flagClass} />
      <span className="currency-label">{currency}</span>
    </div>
  )
}

export default CurrencyOption

CurrencyOption.propTypes = {
  currency: PropTypes.string,
}

CurrencyOption.defaultProps = {
  currency: '',
}
