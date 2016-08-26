import { PASSWORDS_MATCH, VALID_EMAIL, SIGNUP } from '../actions/signup'
import { handleActions } from 'redux-actions'
import { default as Immutable } from 'immutable'

const initialState = Immutable.Map({
  validEmail: null,
  validPassword: null,
  signupError: null
})

export const reducer = handleActions({
  [PASSWORDS_MATCH]: (state, action) => {
    if (action.error) {
      return state
        .set('validPassword', false)
        .set('signupError', Immutable.fromJS({
          message: action.payload.message,
          name: action.payload.name
        }))
    }

    return state
      .set('signupError', null)
      .set('validPassword', true)
  },
  [VALID_EMAIL]: (state, action) => {
    if (action.error) {
      return state
        .set('validEmail', false)
        .set('signupError', Immutable.fromJS({
          message: action.payload.message,
          name: action.payload.name
        }))
    }

    return state
      .set('signupError', null)
      .set('validEmail', true)
  },
  [SIGNUP]: (state, action) => {
    if (action.error) {
      return state
        .set('signupError', Immutable.fromJS({
          message: action.payload.message,
          name: action.payload.name
        }))
    }

    return state
      .set('signupError', null)
  }
}, initialState)
