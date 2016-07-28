/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Start from './start.js';
import App from './client/app.js';
import addTask from './client/addTask.js';

import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Rumi extends Component {
  render() {
    return (
     <NavigatorIOS style={{flex: 1}} initialRoute={{title: 'addTask', component: addTask}} renderScene={(route, navigator) => { <addTask />}}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Rumi', () => Rumi);
