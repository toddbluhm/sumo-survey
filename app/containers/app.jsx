import React, { Component, PropTypes } from 'react'
import { MuiThemeProvider } from 'material-ui'
import { AppBar, ContentArea } from '../components'

export class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar />
          <ContentArea>{this.props.children}</ContentArea>
        </div>
      </MuiThemeProvider>
    )
  }
}
