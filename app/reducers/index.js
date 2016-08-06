import { combineReducers } from 'redux-immutable';
import { reducer as auth } from './auth';
import { reducer as test } from './test';
import { reducer as reduxAsyncConnect, setToImmutableStateFunc, setToMutableStateFunc } from 'redux-connect';
import { reducer as routerReducer } from './routerReducer';
import { default as Immutable } from 'immutable';

// Set the mutability/immutability functions
setToImmutableStateFunc((mutableState) => Immutable.fromJS(mutableState));
setToMutableStateFunc((immutableState) => immutableState.toJS());

export const rootReducer = combineReducers({
  auth,
  test,
  routing: routerReducer,
  reduxAsyncConnect
});
