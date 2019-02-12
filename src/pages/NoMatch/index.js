import React from 'react'
import Lottie from 'react-lottie'
import * as animation from 'assets/animations/404animation.json'
import './styles.scss'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}


const NoMatch = () => (
  <div className="no-match-container">
    <Lottie
      options={defaultOptions}
      width={600}
      isStopped={false}
      isPaused={false}
    />
    <h2>Oops, seems like the page you request isn't available right now...</h2>
    <h4>This is awkward...</h4>
  </div>
)

export default NoMatch
