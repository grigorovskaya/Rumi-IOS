import React from 'react';
import {
	AppRegistry, 
	ScrollView,
	View,
	Text,
	StyleSheet,
  Image
} from 'react-native';
import { Divider } from 'react-native-material-design';


export const CompletedDiv = (props) => {
    return (
      <View>
        <View style={style.container} >
            <Divider />
            <Image style={style.image} source={require('./img/star.png')}/>
            <View >
            <Text style={style.text} ></Text>
            <Text style={style.boldText} >{props.user.name}</Text>
            <Text style={style.text}>{props.task.name}</Text></View>
            <Divider inset={true} />
        </View> 
      </View>
    );
};

const style = {
  container: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    margin: 10,
  },
  boldText: {
    fontWeight: 'bold',
    margin: 6,
    marginBottom: 0
  },
  text: {
    marginTop: 2
  },
  textBold: {
    fontWeight: 'bold',
    margin: 10,
    marginLeft: 10
  },
  image: {
    width: 50,
    height: 50,
    margin: 15
  }
};