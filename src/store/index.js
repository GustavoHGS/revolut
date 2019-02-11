import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import history from '../history'
import reducers from '../reducers'


const middlewareHistory = routerMiddleware(history)

const rootReducer = combineReducers({
  ...reducers,
  router: connectRouter(history),
})

const middleware = applyMiddleware(
  middlewareHistory,
  thunk,
  createLogger(),
)

const store = createStore(
  rootReducer,
  middleware,
)

export default store
