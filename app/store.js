import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import createLogger from 'redux-logger'
import { rootReducer } from './reducers'
import { routerMiddleware } from 'react-router-redux'

export function configureStore (preloadedState, browserHistory) {
  // Apply the middleware to the store
  const routermiddleware = routerMiddleware(browserHistory)
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(promiseMiddleware, /*createLogger(),*/ routermiddleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
  )

  return store
}
