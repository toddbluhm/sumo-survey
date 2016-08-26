import React, { Component, PropTypes } from 'react'
import MediaQuery from 'react-responsive'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { TextField, RaisedButton } from 'material-ui'
import { Main } from './Main'
import { CardModal } from '../components/CardModal'
import { login } from '../actions/auth'
import { signup, validatePasswords, validateEmail } from '../actions/signup'

@connect(state => ({
  viewSize: state.getIn(['ui', 'device', 'viewSize']),
  signupError: state.getIn(['signup', 'signupError'])
}), { signup, login, push, validatePasswords, validateEmail })
export class SignUp extends Component {
  static propTypes = {
    viewSize: PropTypes.number.isRequired,
    signupError: PropTypes.object,
    signup: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    validatePasswords: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired
  }

  signup () {
    const { signup, login, push, validateEmail, validatePasswords } = this.props
    const email = this.refs.email.getValue()
    const pass = this.refs.password.getValue()
    const pass2 = this.refs.password2.getValue()

    return validateEmail(email)
      .then(() => validatePasswords(pass, pass2))
      .then(() => signup(email, pass))
      .then(() => login(email, pass))
      .then(() => push('/admin'))
  }

  getEmailError () {
    const { signupError } = this.props

    if (signupError) {
      const errorObj = signupError.toJS()
      if (errorObj.name === 'email') {
        return errorObj.message
      }
    }
  }

  getPasswordError () {
    const { signupError } = this.props

    if (signupError) {
      const errorObj = signupError.toJS()
      if (errorObj.name === 'password') {
        return errorObj.message
      }
    }
  }

  getPassword2Error () {
    const { signupError } = this.props

    if (signupError) {
      const errorObj = signupError.toJS()
      if (errorObj.name === 'password2') {
        return errorObj.message
      }
    }
  }

  render () {
    const { push, viewSize, validatePasswords, validateEmail } = this.props

    const textNode = (
      <div>
        <TextField
          ref={'email'}
          hintText={"jonnyappleseed@apple.com"}
          errorText={this.getEmailError()}
          floatingLabelText={"Email"}
          onBlur={() => validateEmail(this.refs.email.getValue())}
        />
        <br />
        <TextField
          ref={'password'}
          hintText={"password"}
          errorText={this.getPasswordError()}
          floatingLabelText={"Password"}
          type={"password"}
        />
        <br />
        <TextField
          ref={'password2'}
          hintText={"password"}
          errorText={this.getPassword2Error()}
          floatingLabelText={"Password Again"}
          type={"password"}
          onChange={() => validatePasswords(this.refs.password.getValue(), this.refs.password2.getValue())}
        />
      </div>
    )

    const actionNode = [
      <RaisedButton key={'signup'}
        label={"Sign Up"}
        secondary
        style={{ marginRight: '12px' }}
        onClick={() => this.signup()} />,
      <RaisedButton key={'cancel'}
        label={"Cancel"}
        onClick={() => push('/')} />
    ]

    return (
      <div>
        {/* Desktop or Laptop*/}
        <MediaQuery minDeviceWidth={1225} values={{deviceWidth: viewSize}}>
          <Main />
        </MediaQuery>
        <CardModal
          handleClose={() => push('/')}
          open
          title={'Sign Up'}
          textNode={textNode}
          actionNode={actionNode} />
      </div>
    )
  }
}
