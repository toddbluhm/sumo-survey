import React, { Component, PropTypes } from 'react'
import { asyncConnect } from 'redux-connect'
import { AppBar, Drawer, MenuItem } from 'material-ui'
import { toggleAppDrawerActive } from '../actions/ui/app'

@asyncConnect([],
  state => ({
    drawerActive: state.getIn(['ui', 'app', 'drawerActive'])
  }), { toggleAppDrawerActive })
export class MobileApp extends Component {
  static propTypes = {
    title: PropTypes.string.required,
    signUpBtnLabel: PropTypes.string.required,
    signUpBtnIcon: PropTypes.node.required,
    loginBtnLabel: PropTypes.string.required,
    loginBtnIcon: PropTypes.node.required,
    // State props
    drawerActive: PropTypes.bool.required,
    toggleAppDrawerActive: PropTypes.func.required
  }

  render () {
    const { title, signUpBtnLabel, signUpBtnIcon, loginBtnLabel, loginBtnIcon } = this.props
    return (
      <div>
        <AppBar
          title={title}
          onLeftIconButtonTouchTap={this.props.toggleAppDrawerActive} />
        <Drawer
          open={this.props.drawerActive}
          docked={false}
          onRequestChange={this.props.toggleAppDrawerActive}>
          <MenuItem leftIcon={signUpBtnIcon} primaryText={signUpBtnLabel} />
          <MenuItem leftIcon={loginBtnIcon} primaryText={loginBtnLabel} />
        </Drawer>
      </div>
    )
  }
}
