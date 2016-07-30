import { combineReducers } from 'redux'
import {
  REQUEST_SURVEY, RECEIVE_SURVEY
} from '../actions'

function Survey(state = {}, action) {
  switch(action.type) {
    case RECEIVE_SURVEY:
      return Object.assign({}, state, {
        survey: action.survey
      });
    case REQUEST_SURVEY:
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  Survey
})

export default rootReducer
