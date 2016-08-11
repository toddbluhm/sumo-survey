import React, { Component, PropTypes } from 'react'
import { MuiThemeProvider, AppBar } from 'material-ui'
import { AppBarButton } from '../components'

export class DesktopApp extends Component {
  static propTypes = {
    title: PropTypes.string.required,
    signUpBtnLabel: PropTypes.string.required,
    signUpBtnIcon: PropTypes.node.required,
    loginBtnLabel: PropTypes.string.required,
    loginBtnIcon: PropTypes.node.required
  }

  render () {
    const { title, signUpBtnLabel, signUpBtnIcon, loginBtnLabel, loginBtnIcon } = this.props
    return (
      <AppBar showMenuIconButton={false} title={title}>
        <AppBarButton label={signUpBtnLabel} icon={signUpBtnIcon} secondary />
        <AppBarButton label={loginBtnLabel} icon={loginBtnIcon} />
      </AppBar>
    )
  }
}
