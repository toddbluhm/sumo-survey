import React, { Component, PropTypes } from 'react'
import MediaQuery from 'react-responsive'
import { Card, CardActions, CardHeader, CardText, RaisedButton } from 'material-ui'

export class CardModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    textNode: PropTypes.node,
    actionNode: PropTypes.node
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
    return (
      <div>
        {/* Desktop or Laptop*/}
        <MediaQuery minDeviceWidth={1225} values={{deviceWidth: 1000}}>
        </MediaQuery>
        {/* Table or mobile phone*/}
        <MediaQuery maxDeviceWidth={1224} values={{deviceWidth: 1000}}>
          <Card style={styles.any.cardStyle}>
            <CardHeader title={title} />
            <CardText>
              {textNode}
            </CardText>
            <CardActions>
              {actionNode}
            </CardActions>
          </Card>
        </MediaQuery>
      </div>
    )
  }
}
