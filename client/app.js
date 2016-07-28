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
import { BlurView, VibrancyView } from 'react-native-blur';
import { Actions } from 'react-native-router-flux';
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
			<ScrollView automaticallyAdjustContentInsets={false}
          horizontal={true}
          style={[style.scrollView, style.horizontalScrollView]}>
			{this.state.recentTasks.map(recentTask => {
				return (<Task task={recentTask} id={recentTask.id}
                      name={recentTask.name}
                      due={moment().endOf(recentTask.dueBy).fromNow()}
                      color={1}
                      key={recentTask.id}
                      completeTask={this.completeTask.bind(this)}/>);
			})}
			</ScrollView>
			<ScrollView automaticallyAdjustContentInsets={false}
          horizontal={true}
          style={[style.scrollView, style.horizontalScrollView]}>
			{this.state.completedTasks.map(completedTask => {
				return (<Task task={completedTask} id={completedTask.id}
                      name={completedTask.name}
                      due={moment().endOf(completedTask.dueBy).fromNow()}
                      color={2}
                      key={completedTask.id}
                      completeTask={this.completeTask.bind(this)}/>);
			})}
			</ScrollView>
			

			<View style={{flex:1, backgroundColor: '#f3f3f3'}}>
			        <ActionButton position={'center'} degrees={45} backdrop={<BlurView blurType='extra light' style={style.blur}/>} buttonColor="rgba(231,76,60,1)">
			          <ActionButton.Item buttonColor='#9b59b6' onPress={Actions.addTask}>
			            <Icon name="md-create" style={style.actionButtonIcon} />
			          </ActionButton.Item>
			          <ActionButton.Item position={'center'} buttonColor='#1abc9c' title="Completed Tasks" onPress={() => {}}>
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
		// maxWidth: 300
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
	 blur: {
	 	flex: 1,
	 	backgroundColor: 'transparent',
	 	justifyContent: 'center'
	 },
	 horizontalScrollView: {
	   height: 160,
	 }
};
