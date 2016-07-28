
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { AppRegistry, Text } from 'react-native';

import SignIn from './client/signin';
import SignUp from './client/signup';
import App from './client/app';
import AddTask from './client/addTask';

// trying to see if passing socket down to components as props
// so that no more than one socket connection on each app
var Store = require('react-native-simple-store');

export default class Rumi extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Router>
        <Scene key="root">
          <Scene key="signIn" component={SignIn} title="Sign In" initial={true} Store={Store} />
          <Scene key="signUp" component={SignUp} title="Sign Up" Store={Store} />
          <Scene key="app" component={App} title="Rumi" Store={Store} />
          <Scene key="addTask" component={AddTask} title="Add Task" Store={Store} />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('Rumi', () => Rumi);
