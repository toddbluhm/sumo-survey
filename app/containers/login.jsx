import React, { Component, PropTypes } from 'react'
import MediaQuery from 'react-responsive'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { TextField, RaisedButton } from 'material-ui'
import { Main } from './Main'
import { CardModal } from '../components'
import { login } from '../actions/auth'

@connect(state => ({
  invalidEmail: state.getIn(['auth', 'invalidEmail']),
  invalidPassword: state.getIn(['auth', 'invalidPassword'])
}), { login, push })
export class Login extends Component {
  static propTypes = {
    invalidEmail: PropTypes.string,
    invalidPassword: PropTypes.string,
    open: PropTypes.bool,
    toggleLoginModalActive: PropTypes.func,
    push: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
  }

  render () {
    const { invalidEmail, invalidPassword, login, push } = this.props

    const textNode = (
      <div>
        <TextField
          ref={'email'}
          errorText={invalidEmail}
          hintText={"jonnyappleseed@apple.com"}
          floatingLabelText={"Email"}
        />
        <br />
        <TextField
          ref={'password'}
          errorText={invalidPassword}
          hintText={"password"}
          floatingLabelText={"Password"}
          type={"password"}
        />
      </div>
    )

    const actionNode = [
      <RaisedButton key={'login'}
        label={"Login"}
        primary style={{ marginRight: '12px' }}
        onClick={() => {
          login(this.refs.email.getValue(), this.refs.password.getValue())
            .then(() => push('/admin'))
        }} />,
      <RaisedButton key={'cancel'}
        label={"Cancel"}
        onClick={() => push('/')}
        />
    ]

    return (
      <div>
        {/* Desktop or Laptop*/}
        <MediaQuery minDeviceWidth={1225} values={{deviceWidth: 1000}}>
          <Main />
        </MediaQuery>
        <CardModal
          handleClose={() => push('/')}
          open
          title={'Login'}
          textNode={textNode}
          actionNode={actionNode} />
      </div>
    )
  }
}
