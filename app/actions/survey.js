import { createAction } from 'redux-actions'
import { FetchAPI } from '../fetch'
import { default as BPromise } from 'bluebird'

export const GET_RANDOM_SURVEY = 'GET_RANDOM_SURVEY'
export const getRandomSurvey = createAction(GET_RANDOM_SURVEY, () => {
  return FetchAPI('/survey')
    .then(res => BPromise.props({
      res,
      body: res.json()
    }))
    .then(res => {
      // Handle no surveys remaining that you haven't taken yet
      if (res.res.status === 400 && res.body.name === 'NoSurveys') {
        throw new Error('No more surveys available')
      // Handle any other non-200 request
      } else if (res.res.status !== 200) {
        throw new Error(`Error! status: ${res.res.status} body: ${res.body}`)
      }
      return res.body
    })
})

export const DISMISS_SURVEY = 'DISMISS_SURVEY'
export const dismissSurvey = createAction(DISMISS_SURVEY, (surveyId) => {
  return FetchAPI(`/survey/${surveyId}/dismiss`, { method: 'POST' })
    .then(res => BPromise.props({
      res,
      body: res.json()
    }))
    .then((res) => {
      // Handle no surveys remaining that you haven't taken yet
      if (res.res.status !== 200) {
        throw new Error(`Error! status: ${res.res.status} body: ${res.body}`)
      }
    })
})
