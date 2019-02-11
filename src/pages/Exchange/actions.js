import { createAction } from 'redux-actions'
import * as types from './actionTypes'
import ExchangeServices from './services'

export const fetchCurrencyRate = (baseCurrency, tradeCurrency) => (
  (dispatch) => {
    ExchangeServices
      .fetchCurrencyRate(baseCurrency, tradeCurrency)
      .then((result) => {
        console.log('result rates ', result)
        dispatch(createAction(types.FETCH_CURRENCY_UPDATE_RATE)(result))
      })
      .catch((err) => {
        // alert('erro palces' + JSON.stringify(err))
        console.log(err)
      })
  }
)

