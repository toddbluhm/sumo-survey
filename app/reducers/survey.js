import { GET_RANDOM_SURVEY, DISMISS_SURVEY } from '../actions/survey'
import { handleActions } from 'redux-actions'
import { default as Immutable } from 'immutable'

const initialState = Immutable.Map({
  loading: true,
  none: false
})

export const reducer = handleActions({
  [GET_RANDOM_SURVEY]: (state, action) => {
    state = state.set('loading', false)
    // If we are out of surveys then set that state
    if (action.error && action.payload.message === 'No more surveys available') {
      return state.set('none', true)
    }

    // If it was a different error return the same state
    if (action.error) {
      return state
    }

    // send along the new survey question
    return state.set('question', Immutable.fromJS(action.payload))
  },
  [DISMISS_SURVEY]: (state, action) => {
    if (action.error) {
      return state
    }

    return state
      .delete('question')
      .set('loading', true)
  }
}, initialState)
