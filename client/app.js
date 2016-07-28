import React from 'react';
import {
	AppRegistry, 
	View,
	Text,
	StyleSheet
} from 'react-native';
import Task from './task.js';
import moment from 'moment';
import urgency from './urgency.service';
// import addTask from './addTask.js';

window.navigator.userAgent = "react-native";
// var io = require('socket.io-client/socket.io');
// var obj = [{name: 'Conrad', dueBy: Date.now(), interval: 20, image: '', isArchived: false}];
var io = require('socket.io-client/socket.io');
var socket;

export default class App extends React.Component {
	constructor(props) {
	  super(props);
	  this.socket = socket;
	  this.state = {
	    now: Date.now(),
	    overdueTasks: [],
	    recentTasks: [],
	    urgentTasks: [],
	    completedTasks: [],
	    token: 'hello'
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
		this.props.Store.get('user')
			.then(token => {
				if (token) {
					this.socket = io('http://localhost:3000', {jsonp: false, transports: ['websocket'], query:'token=' + token});
					this.socket.emit('get all tasks');
					this.socket.emit('get completeds');
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
			});
	}

	componentDidMount() {

	}

	completeTask(task) {
		console.log('made it to completeTask');
		this.socket.emit('complete task', task.id);
	}

	render() {
		return (
			<View>
			<View style={style.content}>
			{this.state.overdueTasks.map(overdueTask => {
				return (<Task task={overdueTask} id={overdueTask.id}
                      name={overdueTask.name}
                      due={moment().endOf(overdueTask.dueBy).fromNow()}
                      color={0}
                      key={overdueTask.id}
                      completeTask={this.completeTask.bind(this)}/>);
			})}
			</View>
			<View style={style.content}>
			{this.state.recentTasks.map(recentTask => {
				return (<Task task={recentTask} id={recentTask.id}
                      name={recentTask.name}
                      due={moment().endOf(recentTask.dueBy).fromNow()}
                      color={1}
                      key={recentTask.id}
                      completeTask={this.completeTask.bind(this)}/>);
			})}
			</View>
			<View style={style.content}>
			{this.state.completedTasks.map(completedTask => {
				return (<Task task={completedTask} id={completedTask.id}
                      name={completedTask.name}
                      due={moment().endOf(completedTask.dueBy).fromNow()}
                      color={2}
                      key={completedTask.id}
                      completeTask={this.completeTask.bind(this)}/>);
			})}
			</View>
			</View>
			);
	}
}

const style = {
	content: {
		marginTop: 180, 
		flexDirection: 'row', 
		justifyContent: 'center',
		maxWidth: 300
	}
};
