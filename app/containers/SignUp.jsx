import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Main } from './Main'
import { UserInfoCardModal } from '../components'
import { login } from '../actions/auth'
import { signup } from '../actions/signup'

@connect(state => ({
  signupError: state.getIn(['signup', 'signupError'])
}), { signup, login, push })
export class SignUp extends Component {
  static propTypes = {
    signupError: PropTypes.object,
    signup: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }

  signup (email, pass) {
    const { signup, login, push } = this.props
    signup(email, pass)
      .then(() => login(email, pass))
      .then(() => push('/admin'))
  }

  cancel () {
    this.props.push('/')
  }

  render () {
    const { signupError } = this.props
    return (
      <UserInfoCardModal
        backgroundNode={<Main />}
        title={'Sign Up'}
        submitLabel={'Sign Up'}
        cancelLabel={'Cancel'}
        submitAction={this.signup.bind(this)}
        cancelAction={this.cancel.bind(this)}
        error={signupError ? signupError.toJS() : null} />
    )
  }
}
