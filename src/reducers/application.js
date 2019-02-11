import * as types from 'actions/actionTypes'

const initialState = {
  isApplicationLoading: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.IS_APPLICATION_LOADING:
      return { ...state, isApplicationLoading: payload }
    default:
      return state
  }
}
