/* eslint react/forbid-prop-types: off */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.scss'

export default class Input extends Component {
  state = {}

  handleChange = (e) => {
    const { onChange } = this.props
    onChange(this.props.formatter(e.target.value))
  }

  render() {
    const {
      type, className, label, prefix, value,
    } = this.props
    return (
      <div className="input-container">
        <span className="input-label">{label}</span>
        <div className="row" style={{ alignItems: 'center' }}>
          {prefix()}
          <input
            onChange={this.handleChange}
            value={value}
            className={classNames('input', className)}
            type={type}
            placeholder={this.props.placeholder}
          />
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.func,
  value: PropTypes.any,
  placeholder: PropTypes.any,
  formatter: PropTypes.func,
}

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  className: '',
  label: '',
  prefix: () => {},
  value: '',
  placeholder: '',
  formatter: null,
}
