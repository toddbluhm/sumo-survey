import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import { App } from './containers/App'
import { Main } from './containers/Main'
import { Login } from './containers/Login'
import { SignUp } from './containers/SignUp'
import { Admin } from './containers/Admin'
import { Account } from './containers/Account'
import { authenticated as authenticatedAction } from './actions/auth'

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export function getRoutes (store) {
  const requireAuth = (nextState, replace, callback) => {
    const { authenticated, loaded } = store.getState().getIn(['auth']).toJS()
    if (!loaded) {
      return store.dispatch(authenticatedAction())
        .then(requireAuth.bind(this, nextState, replace, callback))
        .catch(requireAuth.bind(this, nextState, replace, callback))
    }

    if (!authenticated) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
      })
    }
    callback()
  }

  // const redirectAuth = (nextState, replace, callback) => {
  //   const authenticated = store.getState().getIn(['auth', 'authenticated'])
  //   if (authenticated) {
  //     replace({
  //       pathname: '/'
  //     })
  //   }
  //   callback()
  // }

  return (
    <Route path={'/'} component={App} >
      <IndexRoute component={Main} />
      <Route path={'login'} component={Login} />
      <Route path={'signup'} component={SignUp} />
      <Route path={'admin/dashboard'} component={Admin} onEnter={requireAuth} />
      <Route path={'admin/account'} component={Account} onEnter={requireAuth} />
      <Redirect from={'admin'} to={'admin/dashboard'} />
    </Route>
  )
}
