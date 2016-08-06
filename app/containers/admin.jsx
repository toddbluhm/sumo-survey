import React, { Component } from 'react';
import { asyncConnect } from 'redux-connect'
import { Fetch } from '../fetch';
import { authenticated } from '../actions/auth';

export class Admin extends Component {
  render() {
    return (
      <div> Admin Area </div>
    );
  }
}
