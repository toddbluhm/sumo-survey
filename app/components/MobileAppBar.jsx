import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AppBar, Drawer, MenuItem } from 'material-ui'
import { toggleAppDrawerActive } from '../actions/ui/app'

@connect(state => ({
  drawerActive: state.getIn(['ui', 'app', 'drawerActive'])
}), { toggleAppDrawerActive })
export class MobileAppBar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    signUpBtnLabel: PropTypes.string.isRequired,
    signUpBtnIcon: PropTypes.element.isRequired,
    loginBtnLabel: PropTypes.string.isRequired,
    loginBtnIcon: PropTypes.element.isRequired,
    // State props
    drawerActive: PropTypes.bool.isRequired,
    toggleAppDrawerActive: PropTypes.func.isRequired
  }

  render () {
    const { title, signUpBtnLabel, signUpBtnIcon, loginBtnLabel,
      loginBtnIcon, drawerActive, toggleAppDrawerActive } = this.props
    return (
      <div>
        <AppBar
          title={title}
          onLeftIconButtonTouchTap={this.props.toggleAppDrawerActive}
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
      </div>
    )
  }
}
