import { createAction } from 'redux-actions'
import get from 'lodash.get'
import moment from 'moment'
import { message } from 'antd'
import { toDouble } from 'helpers/currency'
import * as walletActionTypes from 'pages/Wallet/actionTypes'
import * as types from './actionTypes'
import ExchangeServices from './services'

const pollInterval = 10000
let timer = null

export const fetchCurrencyRate = (baseCurrency, tradeCurrency) => (
  (dispatch, state) => {
    ExchangeServices
      .fetchCurrencyRate(baseCurrency, tradeCurrency)
      .then((result) => {
        const rates = { ...get(state(), `exchange.lastRates[${baseCurrency}].rates`, {}) }
        const updateTime = moment().format('YYYY/MM/DD').toString()
          .concat(' at ')
          .concat(moment().format('HH:mm:ss').toString())
        dispatch(createAction(types.FETCH_CURRENCY_UPDATE_RATE)({
          ...result,
          rates: {
            ...rates,
            ...result.rates,
            ...result.rates,
          },
          lastUpdatedAt: updateTime,
        }))
      })
      .catch((err) => {
        console.log(err)
      })
  }
)

export const fetchCurrencyHistory = (baseCurrency, tradeCurrency) => (
  (dispatch) => {
    ExchangeServices
      .fetchCurrencyHistory(baseCurrency, tradeCurrency)
      .then((result) => {
        console.log('result history ', result)
        dispatch(createAction(types.FETCH_CURRENCY_HISTORY_RATE)(result))
      })
      .catch((err) => {
        console.log(err)
      })
  }
)

export const startPollCurrencyTask = (baseCurrency, tradeCurrency) => (
  (dispatch) => {
    clearInterval(timer)
    timer = setInterval(
      () => dispatch(fetchCurrencyRate(baseCurrency, tradeCurrency)), pollInterval,
    )
    dispatch(fetchCurrencyRate(baseCurrency, tradeCurrency))
  }
)

export const confirmExchange = (baseCurrency, amountToSell, tradeCurrency, amountToBuy) => (
  (dispatch) => {
    const sellAmount = toDouble(amountToSell)
    const buyAmount = toDouble(amountToBuy)
    dispatch(createAction(walletActionTypes.SUBTRACT_CURRENCY_BALANCE)({
      currency: baseCurrency,
      value: sellAmount,
    }))
    dispatch(createAction(walletActionTypes.ADD_CURRENCY_BALANCE)({
      currency: tradeCurrency,
      value: buyAmount,
    }))
    message.success('Exchange confirmed!')
  }
)
