import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import { push } from 'react-router-redux'
import { AppBar as AppBarUI, Drawer, MenuItem } from 'material-ui'
import { ActionPowerSettingsNew, ActionDashboard, ActionHome, ActionAccountBox } from 'material-ui/svg-icons'
import { AppBarButton } from './'
import { toggleAppDrawerActive } from '../actions/ui/app'
import { logout } from '../actions/auth'

@connect(state => ({
  drawerActive: state.getIn(['ui', 'app', 'drawerActive']),
  viewSize: state.getIn(['ui', 'device', 'viewSize'])
}), { toggleAppDrawerActive, push, logout })
export class AdminAppBar extends Component {
  static propTypes = {
    // State props
    drawerActive: PropTypes.bool.isRequired,
    viewSize: PropTypes.number.isRequired,
    toggleAppDrawerActive: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }

  viewDashboard () {
    this.props.toggleAppDrawerActive()
    this.props.push('/admin/dashboard')
  }

  viewLogout () {
    const { toggleAppDrawerActive, logout, push } = this.props

    toggleAppDrawerActive()
    logout()
      .then(() => {
        return push('/')
      })
  }

  viewHome () {
    this.props.toggleAppDrawerActive()
    this.props.push('/')
  }

  viewAccount () {
    this.props.toggleAppDrawerActive()
    this.props.push('/admin/account')
  }

  render () {
    // Store some info up here to avoid duplication later
    const title = 'Sumo Survey'
    const dashboardBtnLabel = 'Dashboard'
    const dashboardBtnIcon = <ActionDashboard />
    const homeBtnLabel = 'Home'
    const homeBtnIcon = <ActionHome />
    const accountBtnLabel = 'Account'
    const accountBtnIcon = <ActionAccountBox />
    const logoutBtnLabel = 'Logout'
    const logoutBtnIcon = <ActionPowerSettingsNew />

    // State and actions from props
    const { drawerActive, toggleAppDrawerActive, viewSize } = this.props

    return (
      <div>
        {/* Desktop or Laptop*/}
        <MediaQuery minDeviceWidth={1225} values={{deviceWidth: viewSize}}>
          <AppBarUI showMenuIconButton={false}
            title={title}
            onTitleTouchTap={this.viewHome.bind(this)} >
            <AppBarButton label={dashboardBtnLabel}
              icon={dashboardBtnIcon}
              secondary
              onClick={this.viewDashboard.bind(this)} />
            <AppBarButton label={accountBtnLabel}
              icon={accountBtnIcon}
              onClick={this.viewAccount.bind(this)} />
            <AppBarButton label={logoutBtnLabel}
              icon={logoutBtnIcon}
              onClick={this.viewLogout.bind(this)} />
          </AppBarUI>
        </MediaQuery>
        {/* Table or mobile phone*/}
        <MediaQuery maxDeviceWidth={1224} values={{deviceWidth: viewSize}}>
          <AppBarUI
            title={title}
            onTitleTouchTap={this.viewHome.bind(this)}
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
            <MenuItem leftIcon={dashboardBtnIcon}
              primaryText={dashboardBtnLabel}
              onClick={this.viewDashboard.bind(this)} />
            <MenuItem leftIcon={accountBtnIcon}
              primaryText={accountBtnLabel}
              onClick={this.viewAccount.bind(this)} />
            <MenuItem leftIcon={logoutBtnIcon}
              primaryText={logoutBtnLabel}
              onClick={this.viewLogout.bind(this)} />
          </Drawer>
        </MediaQuery>
      </div>
    )
  }
}
