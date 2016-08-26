import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getRandomSurvey, dismissSurvey, answerSurvey } from '../actions/survey'
import MediaQuery from 'react-responsive'
import { Card, CardActions, CardTitle, CardText, RaisedButton, IconButton } from 'material-ui'
import { NavigationClose } from 'material-ui/svg-icons'
import { grey300, grey500 } from 'material-ui/styles/colors'

@connect(
  state => ({
    question: state.getIn(['survey', 'question']),
    surveyLoading: state.getIn(['survey', 'loading']),
    viewSize: state.getIn(['ui', 'device', 'viewSize'])
  }), { getRandomSurvey, dismissSurvey, answerSurvey })
export class SurveyCard extends Component {
  static propTypes = {
    // State
    question: PropTypes.object,
    surveyLoading: PropTypes.bool.isRequired,
    viewSize: PropTypes.number.isRequired,
    // Action methods
    dismissSurvey: PropTypes.func.isRequired,
    getRandomSurvey: PropTypes.func.isRequired,
    answerSurvey: PropTypes.func.isRequired
  }

  getStyles () {
    return {
      mobile: {
        ActionButtonStyles: {
          margin: '0.5rem 0'
        }
      },
      desktop: {
        ActionButtonStyles: {
          margin: '0.5rem'
        }
      },
      any: {
        cardStyle: {
          flex: '0 1 80%',
          minWidth: '20rem',
          maxWidth: '30rem'
        },
        cardCloseStyle: {
          position: 'absolute',
          top: '0',
          left: '100%',
          transform: 'translate(-100%, 0%)'
        }
      }
    }
  }

  answerSurvey (answerId) {
    const { answerSurvey, getRandomSurvey } = this.props
    let { question } = this.props

    if (question) {
      question = question.toJS()
    }

    return answerSurvey(question.id, answerId)
      .then(() => getRandomSurvey())
  }

  render () {
    const styles = this.getStyles()
    const { getRandomSurvey, dismissSurvey } = this.props
    const { surveyLoading, viewSize } = this.props
    let { question } = this.props

    if (question) {
      question = question.toJS()
    }

    if (surveyLoading) {
      return (
        <Card style={styles.any.cardStyle}>
          <CardText>Loading...</CardText>
        </Card>
      )
    }

    if (!question) {
      return (
        <Card style={styles.any.cardStyle}>
          <CardText>No more surveys to answer at this time.</CardText>
        </Card>
      )
    }

    return (
      <Card style={styles.any.cardStyle}>
        <CardTitle title={"Survey Question"}>
          <IconButton
            style={styles.any.cardCloseStyle}
            tooltip={"Dismiss Survey"}
            onClick={() => {
              dismissSurvey(question.id)
                .then(() => getRandomSurvey())
            }}>
            <NavigationClose color={grey300} hoverColor={grey500} />
          </IconButton>
        </CardTitle>
        <CardText>
          {question.text}
        </CardText>
        <CardActions>
          {/* Desktop or Laptop*/}
          <MediaQuery minDeviceWidth={1225} values={{deviceWidth: viewSize}}>
            {question.answers.map(answer =>
              <RaisedButton key={answer.id}
                style={styles.desktop.ActionButtonStyles}
                label={answer.text}
                primary
                onClick={() => this.answerSurvey(answer.id)} />
            )}
          </MediaQuery>
          {/* Table or mobile phone*/}
          <MediaQuery maxDeviceWidth={1224} values={{deviceWidth: viewSize}}>
            {question.answers.map(answer =>
              <RaisedButton key={answer.id} style={styles.mobile.ActionButtonStyles} label={answer.text} primary fullWidth />
            )}
          </MediaQuery>
        </CardActions>
      </Card>
    )
  }
}
