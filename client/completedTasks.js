import React from 'react';
import {
	AppRegistry, 
	ScrollView,
	View,
	Text,
	StyleSheet
} from 'react-native';
import { Divider } from 'react-native-material-design';


export const CompletedDiv = (props) => {
    return (
        <View>
            <Divider  />
            <Text>{props.user.name}</Text>
            <Text>{props.task.name}</Text>
            <Divider inset={true} />
        </View> 
    );
};