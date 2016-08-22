import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import createLogger from 'redux-logger'
import { rootReducer } from './reducers'
import { routerMiddleware } from 'react-router-redux'
import { setJWT } from './fetch'

export function configureStore (preloadedState, browserHistory) {
  // Set the jwt token on the fetch client so we don't have to pass it around
  if (preloadedState && preloadedState.hasIn(['auth', 'jwt'])) {
    setJWT(preloadedState.getIn(['auth', 'jwt']))
  }

  // Apply the middleware to the store
  const routermiddleware = routerMiddleware(browserHistory)
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(promiseMiddleware, createLogger(), routermiddleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
  )

  return store
}
