import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.scss'

export default class Input extends Component {
  state = {
    innerValue: 0,
  }

  handleChange = (e) => {
    const { onChange } = this.props
    this.setState({
      innerValue: e.target.value,
    })
    onChange(e.target.value)
  }

  render() {
    const { innerValue } = this.state
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
            value={innerValue || value}
            className={classNames('input', className)}
            type={type}
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
  value: PropTypes.string || PropTypes.number,
}

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  className: '',
  label: '',
  prefix: () => {},
  value: 0,
}
