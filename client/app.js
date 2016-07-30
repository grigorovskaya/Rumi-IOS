import React from 'react';
import {
	AppRegistry, 
	ScrollView,
	View,
	Text,
	StyleSheet
} from 'react-native';
import Task from './task.js';
import moment from 'moment';
import urgency from './urgency.service';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import CompletedView from './completedView.js';
// import addTask from './addTask.js';

window.navigator.userAgent = "react-native";
// var io = require('socket.io-client/socket.io');

// var io = require('socket.io-client/socket.io');
// var socket = io('http://localhost:3000', {jsonp: false, transports: ['websocket']});
var socket;
var io = require('socket.io-client/socket.io');

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
	  }, 60000); // update every minute
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
	}

	componentDidMount() {
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
					this.socket.on('completed task', completedTask => {
					  this.socket.emit('get all tasks');
					  var cs = this.state.completedTasks;
					  cs.unshift(completedTask);
					  this.setState({
					    completedTasks: cs
					  });
					  console.log('this is cs',cs);
					});
				}
	  });
	}

	toAddTaskPage(){
		this.socket.emit('disconnect');
		Actions.addTask({socket: this.socket});
	}



	completeTask(task) {
		this.socket.emit('complete task', task.id);
	}

	render() {
		return (
			<View style={style.content}>
			
			<ScrollView automaticallyAdjustContentInsets={false}
          horizontal={true}
          style={[style.scrollView, style.horizontalScrollView]}>
			{this.state.overdueTasks.map(overdueTask => {
				return (<Task task={overdueTask} id={overdueTask.id}
                      name={overdueTask.name}
                      due={moment().endOf(overdueTask.dueBy).fromNow()}
                      color={0}
                      key={overdueTask.id}
                      completeTask={this.completeTask.bind(this)}/>);
			})}
			</ScrollView>
			<ScrollView automaticallyAdjustContentInsets={false} horizontal={true} style={[style.scrollView, style.horizontalScrollView]}>
			{this.state.urgentTasks.map(urgentTask => {
				return (<Task task={urgentTask} id={urgentTask.id}
                      name={urgentTask.name}
                      due={moment().endOf(urgentTask.dueBy).fromNow()}
                      color={1}
                      key={urgentTask.id}
                      completeTask={this.completeTask.bind(this)}/>);
			})}
			</ScrollView>
			<ScrollView automaticallyAdjustContentInsets={false}
          horizontal={true}
          style={[style.scrollView, style.horizontalScrollView]}>
			{this.state.recentTasks.map(recentTask => {
				return (<Task task={recentTask} id={recentTask.id}
                      name={recentTask.name}
                      due={moment().endOf(recentTask.dueBy).fromNow()}
                      color={2}
                      key={recentTask.id}
                      completeTask={this.completeTask.bind(this)}/>);
			})}
			</ScrollView>
			

			<View style={{flex:1, backgroundColor: '#f3f3f3'}}>
			        <ActionButton position={'center'} degrees={45} buttonColor="#48BBEC">
			          <ActionButton.Item buttonColor='#E96D60' onPress={() => this.toAddTaskPage()}>
			            <Icon name="md-create" style={style.actionButtonIcon} />
			          </ActionButton.Item>
			          <ActionButton.Item position={'center'} buttonColor='#1abc9c' 
			            onPress={() => {Actions.completedView({completedTaskList: this.state.completedTasks})}}>
			          <Icon name="md-done-all" style={style.actionButtonIcon} />
			          </ActionButton.Item>
			        </ActionButton>
			      </View>
			</View>

			);
	}
}

const style = {
	content: {
		marginTop: 100, 
		justifyContent: 'center',
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
	actionButtonIcon: {
	    fontSize: 20,
	    height: 22,
	    color: 'white',
	},
	scrollView: {
	   height: 300,
	 },
	 horizontalScrollView: {
	   height: 160,
	 }
};
