import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.scss'

const Chip = ({ label, primary, content }) => (
  <div className={classNames('container', primary ? 'primary' : '')}>
    {label || content()}
  </div>
)

export default Chip

Chip.propTypes = {
  label: PropTypes.string,
  primary: PropTypes.bool,
  content: PropTypes.func,
}

Chip.defaultProps = {
  label: '',
  primary: false,
  content: () => {},
}
