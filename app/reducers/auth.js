import { AUTHENTICATED, LOGIN } from '../actions/auth'
import { handleActions } from 'redux-actions'
import { default as Immutable } from 'immutable'
import { setJWT } from '../fetch'

const initialState = Immutable.Map({
  authenticated: false,
  loaded: false,
  jwt: null
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
    if (action.error) {
      return state.set('authenticated', false)
    }

    // update the jwt token on the http client
    setJWT(action.payload.token)
    return state.set('jwt', action.payload.token)
  }
}, initialState)
