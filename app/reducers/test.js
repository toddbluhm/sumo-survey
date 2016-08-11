import { CHANGE_HOME_TEXT } from '../actions/test'
import { handleAction } from 'redux-actions'
import { default as Immutable } from 'immutable'

const initialState = Immutable.Map({
  text: 'Good Cruel World!'
})

export const reducer = handleAction(CHANGE_HOME_TEXT, {
  next: (state, action) => {
    return state.set('text', action.payload)
  },
  throw: (state) => state
}, initialState)
