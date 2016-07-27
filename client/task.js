import React from 'react';
import {
	AppRegistry, 
	View, 
	Text,
	StyleSheet
} from 'react-native';
window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:3000', {jsonp: false, transports: ['websocket']});

    this.state = {
      id: this.props.task.id,
      name: this.props.task.name,
      due: this.props.task.due,
      color: this.props.task.color
    };
    console.log('TASK ', this.state);
  }
//TODO: refactor to get rid of second socket connection
//move to the app level
  completeTask () {
    this.socket.emit('complete task', this.state.task.id);
  }

  render() {
  	return (
  		<View>
  		<Text>{this.state.name}</Text>
  		</View>
  		);
  }
}

const style = {
  height: 50,
  width: 50,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
  overflow: 'hidden'
};