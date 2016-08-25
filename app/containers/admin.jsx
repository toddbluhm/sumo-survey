import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { MuiThemeProvider, RaisedButton } from 'material-ui'
import { logout } from '../actions/auth'

@connect(state => ({}), { logout, push })
export class Admin extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }

  render () {
    const { logout, push } = this.props

    return (
      <MuiThemeProvider>
        <div>
          <h1>Admin Area</h1>
          <RaisedButton
            label={'logout'}
            onClick={() => {
              logout().then(() => push('/'))
            }} />
        </div>
      </MuiThemeProvider>
    )
  }
}
