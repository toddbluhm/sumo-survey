import React, { Component, PropTypes } from 'react'
import MediaQuery from 'react-responsive'
import { Card, CardActions, CardHeader, CardText, RaisedButton } from 'material-ui'

export class Main extends Component {
  static propTypes = {
    title: PropTypes.string,
    headerNode: PropTypes.node,
    textNode: PropTypes.node,
    actionNode: PropTypes.node
  }

  getStyles () {
    return {
      cardStyle: {
        flex: '0 1 80%',
        minWidth: '20rem',
        maxWidth: '30rem'
      }
    }
  }

  render () {
    const { title, headerNode, textNode, actionNode } = this.props

    return (
      <Card style={styles.cardStyle}>
        <CardHeader title={title} />
          {headerNode}
        <CardText>
          {textNode}
        </CardText>
        <CardActions>
          {actionNode}
        </CardActions>
      </Card>
    )
  }
}
