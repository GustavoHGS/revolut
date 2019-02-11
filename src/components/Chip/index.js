/* eslint react/forbid-prop-types: off */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.scss'

const Chip = ({
  label, primary, content, style,
}) => (
  <div
    className={classNames('container', primary ? 'primary' : '')}
    style={style}
  >
    {label || content()}
  </div>
)

export default Chip

Chip.propTypes = {
  label: PropTypes.string,
  primary: PropTypes.bool,
  content: PropTypes.func,
  style: PropTypes.object,
}

Chip.defaultProps = {
  label: '',
  primary: false,
  content: () => {},
  style: null,
}
