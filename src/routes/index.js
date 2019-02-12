import Wallet from 'pages/Wallet'
import Exchange from 'pages/Exchange'

const routes = [
  {
    path: '/',
    component: Wallet,
    exact: true,
  },
  {
    path: '/exchange',
    component: Exchange,
    exact: true,
  },
]

export default routes
