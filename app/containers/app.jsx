import React, { Component } from 'react';
import { ReduxAsyncConnect } from 'redux-connect';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { getRoutes } from '../routes';
import { asyncConnect } from 'redux-connect';
import { authenticated } from '../actions/auth';

export class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
