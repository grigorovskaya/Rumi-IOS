import React from 'react';
import {
	AppRegistry, 
	View,
  TouchableHighlight, 
	Text,
	StyleSheet
} from 'react-native';

window.navigator.userAgent = "react-native";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      id: this.props.task.id,
      name: this.props.task.name,
      due: this.props.task.due,
      color: this.props.task.color
    };
  }

  render() {
  	return (
  		<View style={style.box}>
      <TouchableHighlight onPress={() => this.props.completeTask(this.state)}>
  		<Text style={style.text}>{this.state.name}</Text>
      </TouchableHighlight>
  		</View>
  		);
  }
}

const style = {
	text: {
		textAlign: 'center',
		overflow: 'hidden'
	},
  box: {
    height: 60,
    width: 60,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 100,
    shadowColor: "#000000",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    },
  }
};
