import { createAction } from 'redux-actions'
import { FetchAPI } from '../fetch'

export const GET_RANDOM_SURVEY = 'GET_RANDOM_SURVEY'
export const getRandomSurvey = createAction(GET_RANDOM_SURVEY, () => {
  return FetchAPI('/survey')
    .then(res => res.data)
    .catch(e => {
      const res = e.response
      // Handle no surveys remaining that you haven't taken yet
      if (res.status === 400 && res.data.name === 'NoSurveys') {
        throw new Error('No more surveys available')
      // Handle any other non-200 request
      } else if (res.status !== 200) {
        throw new Error(`Error! status: ${res.status} body: ${res.data}`)
      }
      throw e
    })
})

export const DISMISS_SURVEY = 'DISMISS_SURVEY'
export const dismissSurvey = createAction(DISMISS_SURVEY, (surveyId) => {
  return FetchAPI(`/survey/${surveyId}/dismiss`, { method: 'POST' })
})
