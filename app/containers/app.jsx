import React, { Component, PropTypes } from 'react'
import MediaQuery from 'react-responsive'
import { MuiThemeProvider } from 'material-ui'
import { ActionExitToApp, ContentAddBox } from 'material-ui/svg-icons'
import { DesktopApp } from './desktopApp'
import { MobileApp } from './mobileApp'

export class App extends Component {
  static propTypes = {
    toggleAppDrawerActive: PropTypes.func,
    drawerActive: PropTypes.bool
  }

  render () {
    const appProps = {
      title: 'Sumo Survey',
      signUpBtnLabel: 'Sign Up',
      signUpBtnIcon: <ContentAddBox />,
      loginBtnLabel: 'Login',
      loginBtnIcon: <ActionExitToApp />
    }

    return (
      <MuiThemeProvider>
        <div>
          {/* Desktop or Laptop*/}
          <MediaQuery minDeviceWidth={1225} values={{deviceWidth: 1000}}>
            <DesktopApp {...appProps} />
          </MediaQuery>
          {/* Table or mobile phone*/}
          <MediaQuery maxDeviceWidth={1224} values={{deviceWidth: 1000}}>
            <MobileApp {...appProps} />
          </MediaQuery>
        </div>
      </MuiThemeProvider>
    )
  }
}
