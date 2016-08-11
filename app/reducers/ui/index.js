import { combineReducers } from 'redux-immutable';
import { reducer as app } from './app';

export const reducer = combineReducers({
  app
});
