/* eslint react/forbid-prop-types: off */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.scss'

const Button = ({
  onClick, buttonType, secondary, className, disabled, label,
}) => (
  <button
    onClick={disabled ? null : onClick}
    type={buttonType}
    className={
      classNames('button',
        secondary ? 'secondary' : 'primary',
        className,
        disabled ? 'disabled' : '')
    }
  >
    {label}
  </button>
)

export default Button

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  buttonType: PropTypes.string,
  secondary: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  onClick: () => {},
  label: '',
  buttonType: 'button',
  secondary: false,
  className: '',
  disabled: false,
}
