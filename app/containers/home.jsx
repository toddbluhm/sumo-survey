import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Menu } from '../components/menu';
import { changeHomeText } from '../actions/test';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';

@asyncConnect([],
  state => ({
    text: state.getIn(['test', 'text'])
  }),
  { changeHomeText, pushNavigation: push }
)
export class Home extends Component {
  render() {
    return (
      <div>
        <div>Test Hello!!</div>
        <div>{ this.props.text }</div>
        <div><a onClick={() => this.props.changeHomeText("Hello World!")}>Click here to change text </a></div>
        <div><a onClick={() => this.props.pushNavigation("/login")}>Go To Login Page </a></div>
      </div>
    );
  }
}
