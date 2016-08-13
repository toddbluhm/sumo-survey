import React, { Component, PropTypes } from 'react'
import MediaQuery from 'react-responsive'

export class ContentArea extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  getStyles () {
    return {
      mobile: {
        overflowY: 'auto',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 'calc(100% - 1rem)',
        height: 'calc(100% - 7rem)',
        paddingTop: '5rem',
        paddingBottom: '2rem'
      },
      desktop: {
        overflowY: 'auto',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'calc(100% - 1rem)',
        height: 'calc(100% - 2rem)',
        paddingBottom: '2rem'
      }
    }
  }

  render () {
    const styles = this.getStyles()
    return (
      <div>
        {/* Desktop or Laptop*/}
        <MediaQuery minDeviceWidth={1225} values={{deviceWidth: 1000}}>
          <div style={styles.desktop}>{this.props.children}</div>
        </MediaQuery>
        {/* Table or mobile phone*/}
        <MediaQuery maxDeviceWidth={1224} values={{deviceWidth: 1000}}>
          <div style={styles.mobile}>{this.props.children}</div>
        </MediaQuery>
      </div>
    )
  }
}
