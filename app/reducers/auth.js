import { AUTHENTICATED, LOGIN } from '../actions/auth';
import { handleActions } from 'redux-actions';
import { default as Immutable } from 'immutable';

const initialState = Immutable.Map({
  authenticated: false,
  loaded: false
});

function handleAuth(state, action) {
  state = state.set('loaded', true);

  if (action.error) {
    return state.set('authenticated', false);
  }
  return state.set('authenticated', true);
}

export const reducer = handleActions({
  AUTHENTICATED: handleAuth,
  LOGIN: handleAuth
}, initialState);
