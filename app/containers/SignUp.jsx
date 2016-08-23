import React, { Component, PropTypes } from 'react'
import MediaQuery from 'react-responsive'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { TextField, RaisedButton } from 'material-ui'
import { Main } from './Main'
import { CardModal } from '../components/CardModal'

@connect(state => ({}), { push })
export class SignUp extends Component {
  static propTypes = {
    open: PropTypes.bool,
    toggleLoginModalActive: PropTypes.func,
    push: PropTypes.func
  }

  render () {
    const { push } = this.props

    const textNode = (
      <div>
        <TextField
          hintText={"jonnyappleseed@apple.com"}
          floatingLabelText={"Email"}
        />
        <br />
        <TextField
          hintText={"password"}
          floatingLabelText={"Password"}
          type={"password"}
        />
        <br />
        <TextField
          hintText={"password"}
          floatingLabelText={"Password Again"}
          type={"password"}
        />
      </div>
    )

    const actionNode = [
      <RaisedButton key={'signup'} label={"Sign Up"} secondary style={{ marginRight: '12px' }} />,
      <RaisedButton key={'cancel'} label={"Cancel"} onClick={() => push('/')} />
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
          title={'Sign Up'}
          textNode={textNode}
          actionNode={actionNode} />
      </div>
    )
  }
}
