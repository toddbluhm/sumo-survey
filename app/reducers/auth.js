import { AUTHENTICATED, LOGIN, LOGOUT } from '../actions/auth'
import { handleActions } from 'redux-actions'
import { default as Immutable } from 'immutable'

const initialState = Immutable.Map({
  authenticated: false,
  loaded: false,
  invalidEmail: null,
  invalidPassword: null
})

export const reducer = handleActions({
  [AUTHENTICATED]: (state, action) => {
    state = state.set('loaded', true)

    if (action.error) {
      return state.set('authenticated', false)
    }
    return state.set('authenticated', true)
  },
  [LOGIN]: (state, action) => {
    state = state
      .set('invalidEmail', null)
      .set('invalidPassword', null)

    if (action.error) {
      state = state.set('authenticated', false)

      if (action.payload.message.match(/email/gi)) {
        return state.set('invalidEmail', 'Incorrect Email.')
      }
      return state.set('invalidPassword', 'Incorrect Password.')
    }

    return state
      .set('authenticated', true)
      .set('loaded', true)
  },
  [LOGOUT]: (state, action) => {
    return state
      .set('invalidEmail', null)
      .set('invalidPassword', null)
      .set('authenticated', false)
      .set('loaded', true)
  }
}, initialState)
