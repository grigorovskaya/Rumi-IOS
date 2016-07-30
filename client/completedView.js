import React from 'react';
import {
  AppRegistry, 
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { CompletedDiv } from './completedTasks.js';

export default class CompletedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completedTaskList : this.props.completedTaskList
    };
  }

  render() {
    return (
      <View style={style.container}>
        <ScrollView automaticallyAdjustContentInsets={false} style={style.scrollView}>{
          this.state.completedTaskList.map( comTask => {
            return (<CompletedDiv  key={comTask.id} task={comTask.task} user={comTask.user} />)}
            )
          }
        </ScrollView>
      </View>
      );
  }
};


const style = {
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
  scrollView: {
     flex: 1,
   }
};