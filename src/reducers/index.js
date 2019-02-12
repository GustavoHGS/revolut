import exchangeReducer from 'pages/Exchange/reducer'
import walletReducer from 'pages/Wallet/reducer'
import applicationReducer from './application'

export default {
  application: applicationReducer,
  exchange: exchangeReducer,
  wallet: walletReducer,
}
