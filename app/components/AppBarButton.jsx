import React, { Component } from 'react'
import { RaisedButton } from 'material-ui'

export class AppBarButton extends Component {
  static propTypes = RaisedButton.propTypes

  render () {
    return (
      <div style={{ padding: '0.8rem' }}>
        <RaisedButton {...this.props} />
      </div>
    )
  }
}
