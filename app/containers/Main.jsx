import React, { Component } from 'react'
import { asyncConnect } from 'redux-connect'
import { getRandomSurvey } from '../actions/survey'
import { SurveyCard } from '../components'

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (getState().getIn(['survey', 'loading']) === true) {
      return dispatch(getRandomSurvey())
    }
  }
}])
export class Main extends Component {
  render () {
    return (
      <SurveyCard />
    )
  }
}
