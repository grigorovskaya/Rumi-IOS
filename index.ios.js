
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { AppRegistry, Text } from 'react-native';

import SignIn from './client/signin';
import SignUp from './client/signup';
import App from './client/app';
import AddTask from './client/addTask';

// trying to see if passing socket down to components as props
// so that no more than one socket connection on each app
var io = require('socket.io-client/socket.io');
var socket = io('http://localhost:3000', {jsonp: false, transports: ['websocket']});

export default class Rumi extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="signIn" component={SignIn} title="Sign In" initial={true} />
          <Scene key="signUp" component={SignUp} title="Sign Up" />
          <Scene key="app" component={App} title="Rumi" socket={socket} />
          <Scene key="addTask" component={AddTask} title="Add Task" socket={socket} />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('Rumi', () => Rumi);
