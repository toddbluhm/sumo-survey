// Required for Google Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import React from 'react'
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Root as MainRoot } from './containers/root';
import { syncHistoryWithStore } from 'react-router-redux';
import { configureStore } from './store';
import { browserHistory } from 'react-router';
import { default as Immutable } from 'immutable';

const store = configureStore(Immutable.fromJS(window.__data), browserHistory),
  history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
      return state.get('routing').toJS();
    }
  });

if (window.__data) {
  delete window.__data;
}

const rootEl = document.getElementById('app');

function renderApp(Root) {
  render(
    <AppContainer>
      <Root store={store} history={history}/>
    </AppContainer>,
    rootEl);
}

renderApp(MainRoot);

// render(
//     <App store={store} history={history} routes={routes} />,
//   rootEl);

if (module.hot) {
  module.hot.accept('./containers/root', () => {
    console.log("Reloading Root");
    renderApp(require('./containers/root').Root);
  });

  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    console.log("Reloading Reducers");
    store.replaceReducer(require('./reducers').rootReducer);
    renderApp(require('./containers/root').Root);
  });
}
