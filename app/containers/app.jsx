import React, { Component, PropTypes } from 'react'
import { asyncConnect } from 'redux-connect'
import { MuiThemeProvider } from 'material-ui'
import { AppBar, AdminAppBar, ContentArea } from '../components'
import { authenticated } from '../actions/auth'

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (getState().getIn(['auth', 'loaded']) === false) {
      return dispatch(authenticated())
    }
  }
}],
state => ({
  authenticated: state.getIn(['auth', 'authenticated'])
}))
export class App extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired
  }

  render () {
    const { authenticated } = this.props
    let appBar = <AppBar />
    if (authenticated) {
      appBar = <AdminAppBar />
    }

    return (
      <MuiThemeProvider>
        <div>
          {appBar}
          <ContentArea>{this.props.children}</ContentArea>
        </div>
      </MuiThemeProvider>
    )
  }
}
