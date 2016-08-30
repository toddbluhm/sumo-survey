import React, { Component, PropTypes } from 'react'
import MediaQuery from 'react-responsive'
import { connect } from 'react-redux'
import { TextField, RaisedButton } from 'material-ui'
import { CardModal } from '../components/CardModal'
import { validatePasswords, validateEmail, resetValidations } from '../actions/validations'

@connect(state => ({
  viewSize: state.getIn(['ui', 'device', 'viewSize']),
  errors: state.getIn(['validations']).toJS()
}), { validatePasswords, validateEmail, resetValidations })
export class UserInfoCardModal extends Component {
  static propTypes = {
    // Required values
    backgroundNode: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    // Required Funcs
    submitAction: PropTypes.func.isRequired,
    cancelAction: PropTypes.func.isRequired,
    viewSize: PropTypes.number.isRequired,
    validatePasswords: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired,
    resetValidations: PropTypes.func.isRequired,
    // Optional Values
    emailValue: PropTypes.string,
    errors: PropTypes.object
  }

  submit () {
    const { submitAction, validateEmail, validatePasswords } = this.props
    const email = this.refs.email.getValue()
    const pass = this.refs.password.getValue()
    const pass2 = this.refs.password2.getValue()

    return validateEmail(email)
      .then(() => validatePasswords(pass, pass2))
      .then(() => submitAction(email, pass))
  }

  cancel () {
    const { resetValidations, cancelAction } = this.props
    resetValidations()
    return cancelAction()
  }

  getEmailError () {
    const { errors } = this.props

    if (errors.validEmail === false &&
      errors.emailError.name === 'email') {
      return errors.emailError.message
    }
  }

  getPasswordError () {
    const { errors } = this.props

    if (errors.validPassword === false &&
      errors.passwordError.name === 'password') {
      return errors.passwordError.message
    }
  }

  getPassword2Error () {
    const { errors } = this.props

    if (errors.validPassword === false &&
      errors.passwordError.name === 'password2') {
      return errors.passwordError.message
    }
  }

  render () {
    const { viewSize, validatePasswords, validateEmail, title,
      emailValue, submitLabel, cancelLabel, backgroundNode } = this.props

    const textNode = (
      <div>
        <TextField
          ref={'email'}
          hintText={'jonnyappleseed@apple.com'}
          errorText={this.getEmailError()}
          defaultValue={emailValue}
          floatingLabelText={'Email'}
          onBlur={() => validateEmail(this.refs.email.getValue())}
        />
        <br />
        <TextField
          ref={'password'}
          hintText={'password'}
          errorText={this.getPasswordError()}
          floatingLabelText={'Password'}
          type={'password'}
        />
        <br />
        <TextField
          ref={'password2'}
          hintText={'password'}
          errorText={this.getPassword2Error()}
          floatingLabelText={'Password Again'}
          type={'password'}
          onChange={() => validatePasswords(this.refs.password.getValue(), this.refs.password2.getValue())}
        />
      </div>
    )

    const actionNode = [
      <RaisedButton key={'submit'}
        label={submitLabel}
        secondary
        style={{ marginRight: '12px' }}
        onClick={this.submit.bind(this)} />,
      <RaisedButton key={'cancel'}
        label={cancelLabel}
        onClick={this.cancel.bind(this)} />
    ]

    return (
      <div>
        {/* Desktop or Laptop*/}
        <MediaQuery minDeviceWidth={1225} values={{deviceWidth: viewSize}}>
          {backgroundNode}
        </MediaQuery>
        <CardModal
          handleClose={this.cancel.bind(this)}
          open
          title={title}
          textNode={textNode}
          actionNode={actionNode} />
      </div>
    )
  }
}
