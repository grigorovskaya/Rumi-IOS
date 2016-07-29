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
            <Divider  />
            <Image style={style.image} source={{uri:'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/NotCommons-emblem-copyrighted.svg/50px-NotCommons-emblem-copyrighted.svg.png'}}/>
            <Text style={style.text} >{props.user.name}</Text>
            <Text>{"\n"}{"\n"}</Text>
            <Text style={style.text}>{props.task.name}</Text>
            <Divider inset={true} />
        </View> 
    );
};

const style = {
  container: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  text: {
    flexDirection: 'column'
  },
  image: {
    width: 50,
    height: 50
  }
}