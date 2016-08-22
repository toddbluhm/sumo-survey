import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import { AppBar as AppBarUI, Drawer, MenuItem } from 'material-ui'
import { ActionExitToApp, ContentAddBox } from 'material-ui/svg-icons'
import { AppBarButton } from './'
import { toggleAppDrawerActive } from '../actions/ui/app'

@connect(state => ({
  drawerActive: state.getIn(['ui', 'app', 'drawerActive'])
}), { toggleAppDrawerActive })
export class AppBar extends Component {
  static propTypes = {
    // State props
    drawerActive: PropTypes.bool.isRequired,
    toggleAppDrawerActive: PropTypes.func.isRequired
  }

  render () {
    // Store some info up here to avoid duplication later
    const title = 'Sumo Survey'
    const signUpBtnLabel = 'Sign Up'
    const signUpBtnIcon = <ContentAddBox />
    const loginBtnLabel = 'Login'
    const loginBtnIcon = <ActionExitToApp />

    // State and actions from props
    const { drawerActive, toggleAppDrawerActive } = this.props

    return (
      <div>
        {/* Desktop or Laptop*/}
        <MediaQuery minDeviceWidth={1225} values={{deviceWidth: 1000}}>
          <AppBarUI showMenuIconButton={false} title={title}>
            <AppBarButton label={signUpBtnLabel} icon={signUpBtnIcon} secondary />
            <AppBarButton label={loginBtnLabel} icon={loginBtnIcon} />
          </AppBarUI>
        </MediaQuery>
        {/* Table or mobile phone*/}
        <MediaQuery maxDeviceWidth={1224} values={{deviceWidth: 1000}}>
          <AppBarUI
            title={title}
            onLeftIconButtonTouchTap={toggleAppDrawerActive}
            style={{
              position: 'fixed',
              width: 'calc(100% - 1rem)'
            }} />
          <Drawer
            open={drawerActive}
            docked={false}
            onRequestChange={toggleAppDrawerActive}>
            <MenuItem leftIcon={signUpBtnIcon} primaryText={signUpBtnLabel} />
            <MenuItem leftIcon={loginBtnIcon} primaryText={loginBtnLabel} />
          </Drawer>
        </MediaQuery>
      </div>
    )
  }
}
