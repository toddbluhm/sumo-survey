import { default as Immutable } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = Immutable.Map({
    locationBeforeTransitions: null
});

export const reducer = (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload
    });
  }

  return state;
};
