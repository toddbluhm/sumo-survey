import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { dismissSurvey } from '../actions/survey'
import MediaQuery from 'react-responsive'
import { Card, CardActions, CardHeader, CardTitle, CardText, RaisedButton, IconButton } from 'material-ui'
import { NavigationClose } from 'material-ui/svg-icons'
import { grey300, grey500 } from 'material-ui/styles/colors'

@connect(
  state => ({
    question: state.getIn(['survey', 'question']) ? state.getIn(['survey', 'question']).toJS() : null,
    surveyLoading: state.getIn(['survey', 'loading'])
  }), { dismissSurvey })
export class SurveyCard extends Component {
  static propTypes = {
    // State
    question: PropTypes.object,
    surveyLoading: PropTypes.bool.isRequired,
    // Action methods
    dismissSurvey: PropTypes.func.isRequired
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

  render () {
    const styles = this.getStyles()
    const { dismissSurvey } = this.props
    const { question, surveyLoading } = this.props

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
            onClick={() => dismissSurvey(question.id)}>
            <NavigationClose color={grey300} hoverColor={grey500} />
          </IconButton>
        </CardTitle>
        <CardText>
          {question.text}
        </CardText>
        <CardActions>
          {/* Desktop or Laptop*/}
          <MediaQuery minDeviceWidth={1225} values={{deviceWidth: 1000}}>
            {question.answers.map(answer =>
              <RaisedButton key={answer.id} style={styles.desktop.ActionButtonStyles} label={answer.text} primary />
            )}
          </MediaQuery>
          {/* Table or mobile phone*/}
          <MediaQuery maxDeviceWidth={1224} values={{deviceWidth: 1000}}>
            {question.answers.map(answer =>
              <RaisedButton key={answer.id} style={styles.mobile.ActionButtonStyles} label={answer.text} primary fullWidth />
            )}
          </MediaQuery>
        </CardActions>
      </Card>
    )
  }
}
