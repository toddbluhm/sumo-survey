import fetch from 'isomorphic-fetch';

export const REQUEST_SURVEY = 'REQUEST_SURVEY';
export const RECEIVE_SURVEY = 'RECEIVE_SURVEY';

function requestSurvey() {
  return {
    type: REQUEST_SURVEY
  }
}

function receiveSurvey(json) {
  return {
    type: RECEIVE_SURVEY,
    survey: json.data,
    receivedAt: Date.now()
  }
}

function fetchSurvey() {
  return dispatch => {
    dispatch(requestSurvey())
    return fetch(`/api/survey`)
      .then(response => response.json())
      .then(json => dispatch(receiveSurvey(json)))
  }
}
