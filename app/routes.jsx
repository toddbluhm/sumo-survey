import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from './containers/app';
import { Home } from './containers/home';
import { Login } from './containers/login';
import { Admin } from './containers/admin';
import { authenticated as authenticatedAction } from './actions/auth';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export function getRoutes(store) {
  const requireAuth = (nextState, replace, callback) => {
    const { authenticated, loaded } = store.getState().getIn(['auth']).toJS();
    if (!loaded) {
      return store.dispatch(authenticatedAction())
        .then(requireAuth.bind(this, nextState, replace, callback));
    }

    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const authenticated = store.getState().getIn(['auth','authenticated']);
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="admin" component={Admin} onEnter={requireAuth} />
      <Route path="login" component={Login} />
    </Route>
  );
};
