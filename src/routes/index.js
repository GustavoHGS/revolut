import Home from 'pages/Home'
import Exchange from 'pages/Exchange'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/exchange',
    component: Exchange,
    exact: true,
  },
]

export default routes
