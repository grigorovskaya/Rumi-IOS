import React from 'react';
import {
	AppRegistry, 
	View,
    TouchableHighlight, 
	Text,
	StyleSheet
} from 'react-native';

window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');
var socket = io('http://localhost:3000', {jsonp: false, transports: ['websocket']});
var t = require('tcomb-form-native');

var Form = t.form.Form;
var interval = t.enums({
	'1': 'hours',
	'2': 'days'
}, 'interval');
var Task = t.struct({
	taskName: t.String,
	intervalNum: t.Number,
	intervalVal: interval
});


export default class addTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		//   intervalNum: 0,
		//   intervalVal: 1,
		  // showModal: false,
		  // taskName: '',
		  taskDueDate: '',
		  taskInterval: 0,
		  value: null
		};
	}
	close() {
	  this.setState({
	    showModal: false
	  });
	}

	open() {
	  this.setState({
	    showModal: true
	  });
	}

	// handleTextFieldChange(value) {
	//   this.setState({value});
	// }

	// handleSelectFieldChange(e, i, v) {
	//   this.setState({
	//     value.intervalVal: v
	//   });
	// }

	calcDueDateAndInterval() {
	  let hours = n => 1000*60*60*n;
	  let days = n => hours(n) * 24;

	  let n = Number(this.state.value.intervalNum);
	  // 1 = hours; 2 = days
	  if (this.state.value.intervalVal === '1') {
	    this.state.taskInterval = hours(n);
	  } else if (this.state.value.intervalVal === '2') {
	    this.state.taskInterval = days(n);
	  }

	  this.state.taskDueDate = new Date(Date.now() + this.state.taskInterval);
	  console.log('taskDueDate ', this.state.taskDueDate, 'taskInterval ', this.state.taskInterval);
	}

	handleSubmit() {
	
	  //get the values from form
	  var value = this.refs.form.getValue();
	  if (value) {
	  	console.log(value);
	  	this.setState({value});
	  	//this.clearForm();
	  }
	  this.calcDueDateAndInterval();

	  let taskName = value.taskName;
	  let dueDate =  this.state.taskDueDate;
	  let interval = this.state.taskInterval;

	  if (!taskName || !dueDate) {
	    this.close();
	    return;
	  }

	  socket.emit('create task', {
	    name: taskName,
	    dueBy: dueDate,
	    interval: interval
	  });

	  //this.props.onAddNewTask(taskName, dueDate);
	  this.setState({value: null});
	  this.close();
	}
	render() {
		return (
			<View style={{marginTop: 180}}>
			<Form ref='form' type={Task} value={this.state.value}  />
			<TouchableHighlight onPress={() => this.handleSubmit()}>
			<Text>Add</Text>
			</TouchableHighlight>
			</View>
			);
	}
}

