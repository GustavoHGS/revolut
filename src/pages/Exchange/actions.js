import { createAction } from 'redux-actions'
import get from 'lodash.get'
import * as types from './actionTypes'
import ExchangeServices from './services'

export const fetchCurrencyRate = (baseCurrency, tradeCurrency) => (
  (dispatch, state) => {
    ExchangeServices
      .fetchCurrencyRate(baseCurrency, tradeCurrency)
      .then((result) => {
        console.log('result rates ', result)
        const rates = { ...get(state(), `exchange.lastRates[${baseCurrency}].rates`, {}) }
        dispatch(createAction(types.FETCH_CURRENCY_UPDATE_RATE)({
          ...result,
          rates: {
            ...rates,
            ...result.rates,
          },
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
      .fetchCurrencyRate(baseCurrency, tradeCurrency)
      .then((result) => {
        console.log('result history ', result)
        dispatch(createAction(types.FETCH_CURRENCY_HISTORY_RATE)(result))
      })
      .catch((err) => {
        // alert('erro palces' + JSON.stringify(err))
        console.log(err)
      })
  }
)
