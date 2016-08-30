import { PASSWORDS_MATCH, VALID_EMAIL, RESET_VALIDATIONS } from '../actions/validations'
import { handleActions } from 'redux-actions'
import { default as Immutable } from 'immutable'

const initialState = Immutable.Map({
  validEmail: null,
  emailError: null,
  validPassword: null,
  passwordError: null
})

export const reducer = handleActions({
  [PASSWORDS_MATCH]: (state, action) => {
    if (action.error) {
      return state
        .set('validPassword', false)
        .set('passwordError', Immutable.fromJS({
          message: action.payload.message,
          name: action.payload.name
        }))
    }

    return state
      .set('passwordError', null)
      .set('validPassword', true)
  },
  [VALID_EMAIL]: (state, action) => {
    if (action.error) {
      return state
        .set('validEmail', false)
        .set('emailError', Immutable.fromJS({
          message: action.payload.message,
          name: action.payload.name
        }))
    }
    return state
      .set('emailError', null)
      .set('validEmail', true)
  },
  [RESET_VALIDATIONS]: () => initialState
}, initialState)
