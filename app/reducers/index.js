import { combineReducers } from 'redux-immutable'
import { immutableReducer as reduxAsyncConnect, setToImmutableStateFunc, setToMutableStateFunc } from 'redux-connect'
import { reducer as routerReducer } from './routerReducer'
import { default as Immutable } from 'immutable'
import { reducer as ui } from './ui'
import { reducer as auth } from './auth'
import { reducer as test } from './test'
import { reducer as survey } from './survey'
import { reducer as signup } from './signup'
import { reducer as validations } from './validations'

// Set the mutability/immutability functions
setToImmutableStateFunc((mutableState) => Immutable.fromJS(mutableState))
setToMutableStateFunc((immutableState) => immutableState.toJS())

export const rootReducer = combineReducers({
  reduxAsyncConnect,
  auth,
  test,
  survey,
  signup,
  validations,
  ui,
  routing: routerReducer
})
