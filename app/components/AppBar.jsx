import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import { push } from 'react-router-redux'
import { AppBar as AppBarUI, Drawer, MenuItem } from 'material-ui'
import { ActionExitToApp, ContentAddBox, ActionHome } from 'material-ui/svg-icons'
import { AppBarButton } from './'
import { toggleAppDrawerActive } from '../actions/ui/app'

@connect(state => ({
  drawerActive: state.getIn(['ui', 'app', 'drawerActive']),
  viewSize: state.getIn(['ui', 'device', 'viewSize'])
}), { toggleAppDrawerActive, push })
export class AppBar extends Component {
  static propTypes = {
    // State props
    drawerActive: PropTypes.bool.isRequired,
    toggleAppDrawerActive: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    viewSize: PropTypes.number.isRequired
  }

  viewSignUp () {
    this.props.push('/signup')
    this.props.toggleAppDrawerActive()
  }

  viewLogin () {
    this.props.push('/login')
    this.props.toggleAppDrawerActive()
  }

  viewHome () {
    this.props.push('/')
    this.props.toggleAppDrawerActive()
  }

  render () {
    // Store some info up here to avoid duplication later
    const title = 'Sumo Survey'
    const signUpBtnLabel = 'Sign Up'
    const signUpBtnIcon = <ContentAddBox />
    const loginBtnLabel = 'Login'
    const loginBtnIcon = <ActionExitToApp />
    const homeBtnLabel = 'Home'
    const homeBtnIcon = <ActionHome />

    // State and actions from props
    const { drawerActive, toggleAppDrawerActive, viewSize } = this.props

    return (
      <div>
        {/* Desktop or Laptop*/}
        <MediaQuery minDeviceWidth={1225} values={{deviceWidth: viewSize}}>
          <AppBarUI showMenuIconButton={false} title={title}>
            <AppBarButton label={signUpBtnLabel}
              icon={signUpBtnIcon}
              secondary
              onClick={this.viewSignUp.bind(this)} />
            <AppBarButton label={loginBtnLabel}
              icon={loginBtnIcon}
              onClick={this.viewLogin.bind(this)} />
          </AppBarUI>
        </MediaQuery>
        {/* Table or mobile phone*/}
        <MediaQuery maxDeviceWidth={1224} values={{deviceWidth: viewSize}}>
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
            <MenuItem leftIcon={homeBtnIcon}
              primaryText={homeBtnLabel}
              onClick={this.viewHome.bind(this)} />
            <MenuItem leftIcon={signUpBtnIcon}
              primaryText={signUpBtnLabel}
              onClick={this.viewSignUp.bind(this)} />
            <MenuItem leftIcon={loginBtnIcon}
              primaryText={loginBtnLabel}
              onClick={this.viewLogin.bind(this)} />
          </Drawer>
        </MediaQuery>
      </div>
    )
  }
}
