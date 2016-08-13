import React, { Component, PropTypes } from 'react'
import { AppBar } from 'material-ui'
import { AppBarButton } from './'

export class DesktopAppBar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    signUpBtnLabel: PropTypes.string.isRequired,
    signUpBtnIcon: PropTypes.element.isRequired,
    loginBtnLabel: PropTypes.string.isRequired,
    loginBtnIcon: PropTypes.element.isRequired
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
