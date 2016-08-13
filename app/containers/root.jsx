import React, { Component, PropTypes } from 'react'
import { ReduxAsyncConnect } from 'redux-connect'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { getRoutes } from '../routes'

export class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  reloadOnPropsChange (props, nextProps) {
    return props.location.pathname !== nextProps.location.pathname
  }

  reduxAsyncRender (props) {
    return <ReduxAsyncConnect {...props} reloadOnPropsChange={this.reloadOnPropsChange.bind(this)} />
  }

  render () {
    const { store, history } = this.props
    return (
      <Provider store={store} key={'provider'}>
        <Router render={this.reduxAsyncRender.bind(this)} history={history}>
          {getRoutes(store)}
        </Router>
      </Provider>
    )
  }
}
