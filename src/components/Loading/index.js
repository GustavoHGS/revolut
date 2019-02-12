import React from 'react'
import { connect } from 'react-redux'
import Lottie from 'react-lottie'
import PropTypes from 'prop-types'
import * as animation from 'assets/animations/loading.json'
import './styles.scss'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const Loading = ({ isLoading }) => {
  if (!isLoading) {
    return null
  }
  return (
    <div className="loading-container">
      <div className="loading-background">
        <Lottie
          options={defaultOptions}
          height={120}
          width={120}
          isStopped={false}
          isPaused={false}
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoading: state.application.isApplicationLoading,
})

export default connect(mapStateToProps)(Loading)


Loading.propTypes = {
  isLoading: PropTypes.bool,
}

Loading.defaultProps = {
  isLoading: false,
}
