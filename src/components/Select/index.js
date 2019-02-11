/* eslint react/forbid-prop-types: off */
import React, { Component } from 'react'
import Select from 'react-select'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './styles.scss'

export default class CSelect extends Component {
  state = {}

  handleChange = (value, type) => {
    const { onChange } = this.props
    onChange(value, type)
  }

  render() {
    const {
      className, defaultValue, data, name, isClearable, components, style, formatOptionLabel, value,
    } = this.props
    return (
      <div>
        <Select
          className={classNames('basic-single', className)}
          style={style}
          classNamePrefix="select"
          defaultValue={defaultValue}
          isClearable={isClearable}
          isSearchable
          name={name}
          options={data}
          components={components}
          formatOptionLabel={formatOptionLabel}
          onChange={this.handleChange}
          value={value}
        />
      </div>
    )
  }
}

CSelect.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  defaultValue: PropTypes.object,
  name: PropTypes.string,
  isClearable: PropTypes.bool,
  components: PropTypes.object,
  style: PropTypes.object,
  formatOptionLabel: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.any,
}

CSelect.defaultProps = {
  className: '',
  data: [],
  defaultValue: {},
  name: 'label',
  isClearable: false,
  components: null,
  style: null,
  formatOptionLabel: () => {},
  onChange: () => {},
  value: {},
}
