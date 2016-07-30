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
            <Image style={style.image} source={require('./img/star.png')}/>
            <View ><Text style={style.boldText} >{props.user.name}</Text>
            <Text style={style.text}>{props.task.name}</Text></View>
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
  boldText: {
    fontWeight: 'bold',
    marginLeft: 10
  },
  text: {
<<<<<<< a10b6c5c08ab36219d8fdbb5c71ac1ee5c072a02
    margin : 10
  },
  textBold: {
    fontWeight: 'bold',
    margin: 10
=======
    marginLeft: 10
>>>>>>> (feat) add completed task icon, fix task color scheme
  },
  image: {
    width: 70,
    height: 70
  }
};