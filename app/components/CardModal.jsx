import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import { Card, CardActions, CardHeader, CardText, Dialog } from 'material-ui'

@connect(state => ({
  viewSize: state.getIn(['ui', 'device', 'viewSize'])
}))
export class CardModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    textNode: PropTypes.node,
    actionNode: PropTypes.node,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    viewSize: PropTypes.number.isRequired
  }

  getStyles () {
    return {
      mobile: {
        cardHeader: {
          fontSize: '22px'
        }
      },
      desktop: {
        dialog: {
          maxWidth: '22rem'
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
    const { title, textNode, actionNode, open, handleClose, viewSize } = this.props
    const styles = this.getStyles()
    return (
      <div>
        {/* Desktop or Laptop*/}
        <MediaQuery minDeviceWidth={1225} values={{deviceWidth: viewSize}}>
          <Dialog
            title={title}
            contentStyle={styles.desktop.dialog}
            actions={actionNode}
            modal={false}
            open={open}
            onRequestClose={handleClose}>
            {textNode}
          </Dialog>
        </MediaQuery>
        {/* Table or mobile phone*/}
        <MediaQuery maxDeviceWidth={1224} values={{deviceWidth: viewSize}}>
          <Card style={styles.any.cardStyle}>
            <CardHeader title={title} style={styles.mobile.cardHeader} />
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
