import React from 'react';
import {
	AppRegistry,
	View,
	Text,
	StyleSheet
} from 'react-native';

export default class Start extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={{flex: 1}}>
			<Text style={{marginTop: 180, textAlign: 'center', fontSize: 20}}>Whatever</Text>
			</View>
			)
	}
}