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
      due: this.props.due,
      color: this.props.color
    };
  }

  render() {
    var coloredTask;
    if (this.state.color === 0) {
      coloredTask = <View style={style.redbox}>
          <TouchableHighlight onPress={() => this.props.completeTask(this.state)}>
          <Text style={style.text}>{this.state.name}</Text>
          </TouchableHighlight>
          </View>
    }
    else if (this.state.color === 1) {
      coloredTask = <View style={style.yellowbox}>
        <TouchableHighlight onPress={() => this.props.completeTask(this.state)}>
        <Text style={style.text}>{this.state.name}</Text>
        </TouchableHighlight>
        </View>
    }
    else if (this.state.color === 2) {
      coloredTask = <View style={style.greenbox}>
        <TouchableHighlight onPress={() => this.props.completeTask(this.state)}>
        <Text style={style.text}>{this.state.name}</Text>
        </TouchableHighlight>
        </View>
    }
    return (
      <View>{coloredTask}</View>
      );
    }
}

const style = {
	text: {
		textAlign: 'center',
		overflow: 'hidden'
	},
  redbox: {
    height: 60,
    width: 60,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 100,
    borderColor: 'red',
    borderWidth: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    }
  },
  yellowbox: {
    height: 60,
    width: 60,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 100,
    borderColor: 'yellow',
    borderWidth: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    }
  },
  greenbox: {
    height: 60,
    width: 60,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 100,
    borderColor: 'green',
    borderWidth: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    }
  }
};
