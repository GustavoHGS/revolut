/* eslint react/forbid-prop-types: off */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.scss'

export default class Button extends Component {
  state = {}

  handleClick = () => {
    const { onClick } = this.props
    onClick()
  }

  render() {
    const { label, buttonType, secondary, className, disabled } = this.props
    return (
      <button
        onClick={this.handleClick}
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
  }
}

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
