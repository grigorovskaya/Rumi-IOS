import React from 'react';
import {
	AppRegistry, 
	View,
	Text,
	StyleSheet
} from 'react-native';
import Task from './task.js';
import urgency from './urgency.service';

window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');
// var obj = [{name: 'Conrad', dueBy: Date.now(), interval: 20, image: '', isArchived: false}];


export default class App extends React.Component {
	constructor() {
	  super();
	  this.socket = io('http://localhost:3000', {jsonp: false, transports: ['websocket']});
	  this.state = {
	    now: Date.now(),
	    overdueTasks: [],
	    recentTasks: [],
	    urgentTasks: [],
	    completedTasks: []
	  };

	  setInterval(() => {
	    this.setState({now: Date.now()});

	    let allTasks = [].concat(this.state.urgentTasks, this.state.recentTasks, this.state.overdueTasks);
	    this.reprioritize(allTasks);
	  }, 1000*60); // update every minute
	}

	reprioritize(tasks) {
	  var t = urgency.prioritizeTasks(tasks);

	  this.setState({
	    overdueTasks: t.overdue,
	    urgentTasks: t.urgent,
	    recentTasks: t.recent
	  });
	}

	componentWillMount() {
	  this.socket.emit('get all tasks');
	  this.socket.emit('get completeds');
	}

	componentDidMount() {
	  this.socket.on('sending all tasks', this.reprioritize.bind(this));

	  this.socket.on('sending completeds', completedTasks => {
	    this.setState({completedTasks});
	  });

	  this.socket.on('create task', newTask => {
	    this.socket.emit('get all tasks');
	  });

	  this.socket.on('complete task', function(completedTask) {
	    this.socket.emit('get all tasks');

	    var cs = this.state.completedTasks;
	    cs.unshift(completedTask);

	    this.setState({
	      completedTasks: cs
	    });
	  }.bind(this));

	}

	render() {
		return (
			<View style={{marginTop: 180}}>
			{this.state.overdueTasks.map(task => {
				return (<Task task={task} key={task.id}/>);
			})}

			</View>
			);
	}
}