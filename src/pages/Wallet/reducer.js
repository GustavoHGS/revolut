import { toDouble } from 'helpers/currency'
import * as types from './actionTypes'

const initialState = {
  balance: {
    USD: 10.99,
    GBP: 29.87,
    BRL: 4100.09,
    EUR: 0,
  },
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_CURRENCY_BALANCE:
      return {
        ...state,
        balance: {
          ...state.balance,
          [payload.currency]: toDouble((state.balance[payload.currency]) + payload.value),
        },
      }
    case types.SUBTRACT_CURRENCY_BALANCE:
      return {
        ...state,
        balance: {
          ...state.balance,
          [payload.currency]: toDouble((state.balance[payload.currency] - payload.value)),
        },
      }
    default:
      return state
  }
}
