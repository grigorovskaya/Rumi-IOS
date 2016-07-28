
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var Person = t.struct({
  name: t.String,
  email: t.String,
  password: t.String
});
const options = {};


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  _signUp() {
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      fetch("http://localhost:3000/iosAuth/local/signup", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: value.name,
          email: value.email,
          password: value.password
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.message) {
          this.setState({
            message: responseData.message
          });
        } else if (responseData.id_token) {
          this.props.Store.save('user', responseData.id_token)
            .then(() => {
              Actions.app();
            });
        }
      })
      .done();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>LETS GET RUMI</Text>
        </View>
        <View style={styles.row}>
          <Form
            ref="form"
            type={Person}
            options={options}
          />
        </View>  
        <View style={styles.row}>
          <TouchableHighlight onPress={()=> this._signUp()} style={styles.button} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableHighlight>
          <Text style={styles.notification}>{this.state.message}</Text>
        </View>
      </View>
    );
  }
}
   
var styles = StyleSheet.create({
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
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  notification: {
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 30
  }
});
