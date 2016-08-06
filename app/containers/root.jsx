import React, { Component } from 'react';
import { ReduxAsyncConnect } from 'redux-connect';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { getRoutes } from '../routes';

const reloadOnPropsChange = (props, nextProps) => {
  return props.location.pathname !== nextProps.location.pathname;
};

export const Root = ({ store, history }) => (
  <Provider store={store} key="provider">
    <Router render={(props) => <ReduxAsyncConnect {...props}
      reloadOnPropsChange={reloadOnPropsChange}/>} history={history}>
      {getRoutes(store)}
    </Router>
  </Provider>
);
