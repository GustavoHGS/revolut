import { createSelector } from 'reselect'

export const getLastRates = createSelector(
  state => state.exchange.lastRates,
  lastRates => lastRates,
)

export const getCurrencyBalance = createSelector(
  state => state.wallet.balance,
  balance => balance,
)

export const getExchangeHistory = createSelector(
  state => state.exchange.history,
  history => history,
)
