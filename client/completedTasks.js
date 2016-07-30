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
        <View style={style.container} >
            <Divider />
            <Image style={style.image} source={{uri:'http://resizeimage.net/viewimg/3a7jX4NkOHQzdOxj/OXKUH/tasktask-icon.png'}}/>
            <View ><Text style={style.text} >{props.user.name}</Text>
            <Text >{props.task.name}</Text></View>
            <Divider inset={true} />
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
  text: {
    margin : 10
  },
  textBold: {
    fontWeight: 'bold',
    margin: 10
  },
  image: {
    width: 70,
    height: 70
  }
};