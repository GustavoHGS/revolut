import * as types from './actionTypes'

const initialState = {
  lastRates: {},
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_CURRENCY_UPDATE_RATE:
      return {
        ...state,
        lastRates: {
          ...state.lastRates,
          [payload.base]: { ...payload },
        },
      }
    default:
      return state
  }
}
