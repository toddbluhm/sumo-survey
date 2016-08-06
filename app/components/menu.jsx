import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

export class Menu extends Component {
  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Sumo Surveys"/>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <RaisedButton label="Sign Up" primary={true} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
