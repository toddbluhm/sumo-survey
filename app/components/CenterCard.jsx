import React, { Component, PropTypes } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui'

export class CenterCard extends Component {
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
    const styles = this.getStyles()

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
