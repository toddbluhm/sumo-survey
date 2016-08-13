import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Root as MainRoot } from './containers/Root'
import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore } from './store'
import { browserHistory } from 'react-router'
import { default as Immutable } from 'immutable'

const store = configureStore(Immutable.fromJS(window.__data), browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState (state) {
    return state.get('routing').toJS()
  }
})

const rootEl = document.getElementById('app')

function renderApp (Root) {
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    rootEl)
  // render(
  //   <Root store={store} history={history} />,
  //   rootEl)
}

renderApp(MainRoot)



if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    console.log('Reloading Root')
    renderApp(require('./containers/Root').Root)
  })

  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    console.log('Reloading Reducers')
    store.replaceReducer(require('./reducers').rootReducer)
    renderApp(require('./containers/Root').Root)
  })
}
