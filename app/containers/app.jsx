import React, { Component, PropTypes } from 'react'
import MediaQuery from 'react-responsive'
import { MuiThemeProvider } from 'material-ui'
import { ActionExitToApp, ContentAddBox } from 'material-ui/svg-icons'
import { DesktopAppBar, MobileAppBar, ContentArea } from '../components'

export class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
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
            <DesktopAppBar {...appProps} />
          </MediaQuery>
          {/* Table or mobile phone*/}
          <MediaQuery maxDeviceWidth={1224} values={{deviceWidth: 1000}}>
            <MobileAppBar {...appProps} />
          </MediaQuery>
          <ContentArea>{this.props.children}</ContentArea>
        </div>
      </MuiThemeProvider>
    )
  }
}
