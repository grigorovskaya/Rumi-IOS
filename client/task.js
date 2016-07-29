import React from 'react';
import {
	AppRegistry, 
	View,
  TouchableHighlight, 
	Text,
	StyleSheet
} from 'react-native';

// window.navigator.userAgent = "react-native";

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
    console.log('STATE ', this.state);
    if (this.state.color === 0) {
      coloredTask = <View style={style.redbox}>
          <Text style={style.text}>{this.state.name}</Text>
          </View>
    }
    else if (this.state.color === 1) {
      coloredTask = <View style={style.yellowbox}>
        <Text style={style.text}>{this.state.name}</Text>
        </View>
    }
    else if (this.state.color === 2) {
      coloredTask = <View style={style.greenbox}>
        <Text style={style.text}>{this.state.name}</Text>
        </View>
    }

    
    return (
      <View>
        <TouchableHighlight onPress={() => this.props.completeTask(this.state)}>
          {coloredTask}
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
  redbox: {
    height: 80,
    width: 80,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 7,
    borderColor: '#E96D60',
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
    height: 80,
    width: 80,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 7,
    borderColor: '#F1C40F',
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
    height: 80,
    width: 80,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 7,
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
