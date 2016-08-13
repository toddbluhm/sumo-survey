import React, { Component } from 'react'
import { RaisedButton } from 'material-ui'

export class AppBarButton extends Component {
  static propTypes = RaisedButton.propTypes

  getStyles () {
    return {
      padding: '0.8rem'
    }
  }

  render () {
    return (
      <div style={this.getStyles()}>
        <RaisedButton {...this.props} />
      </div>
    )
  }
}
