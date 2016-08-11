import React, { Component } from 'react'
import { changeHomeText } from '../actions/test'
import { push } from 'react-router-redux'
import { asyncConnect } from 'redux-connect'
import RaisedButton from 'material-ui/RaisedButton'

@asyncConnect([],
  state => ({
    text: state.getIn(['test', 'text'])
  }),
  { changeHomeText, pushNavigation: push }
)
export class Home extends Component {
  render () {
    return (
      <div>
        <div>
          Test Hello!!
        </div>
        <div>
          {this.props.text}
        </div>
        <RaisedButton label='Click to Change Text' onClick={() => this.props.changeHomeText('Hello World!')} primary/>,
        <div>
          <a>Click here to change text</a>
        </div>
        <div>
          <a onClick={() => this.props.pushNavigation('/login')}>Go To Login Page</a>
        </div>
      </div>
    )
  }
}
