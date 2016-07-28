import React from 'react';
import {
	AppRegistry, 
	View,
    TouchableHighlight, 
	Text,
	Button,
	StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';
window.navigator.userAgent = "react-native";
var t = require('tcomb-form-native');
var socket;
var io = require('socket.io-client/socket.io');

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


export default class AddTask extends React.Component {
	constructor(props) {
		super(props);
		this.socket = socket;
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
	
	// close() {
	//   // this.setState({
	//   //   showModal: false
	//   // });
	// }

	// open() {
	//   this.setState({
	//     showModal: true
	//   });
	// }
	componentWillMount() {
	  socket = io('http://localhost:3000', {jsonp: false, transports: ['websocket']});
	  this.socket = socket;
	}


	handleTextFieldChange(value) {
	  this.setState({value});
	}

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

	  this.socket.emit('create task', {
	    name: taskName,
	    dueBy: dueDate,
	    interval: interval
	  });

	  //this.props.onAddNewTask(taskName, dueDate);
	  this.setState({value: null});
	  Actions.app();
	}
	render() {
		return (
			<View style={styles.container}>
			<Form ref='form' type={Task} value={this.state.value} onChange={this.handleTextFieldChange.bind(this)} style={styles.title}/>
			<TouchableHighlight style={styles.button} onPress={() => this.handleSubmit()}>
			<Text style={styles.buttonText}>Add</Text>
			</TouchableHighlight>
			</View>
			);
	}
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});
