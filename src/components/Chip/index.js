import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const Chip = ({ label }) => (
  <div className="container">
    {label}
  </div>
)

export default Chip

Chip.propTypes = {
  label: PropTypes.string,
}

Chip.defaultProps = {
  label: '',
}
