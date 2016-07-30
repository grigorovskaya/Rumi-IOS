
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var Person = t.struct({
  name: t.String,
  password: t.String
});

var options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};


export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  _signIn() {
    var value = this.refs.form.getValue();
    console.log(value);
    if (value) { // if validation fails, value will be null
      fetch("http://localhost:3000/iosAuth/local/signin", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: value.name,
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
          this.setState({
            message: ''
          });
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
      
      <View >
      <Image style={styles.stretch} source={require('./img/cover.jpg')} >
      <View style={styles.row}>
        <Text style={styles.title}>RUMI</Text>
      </View>
      </Image>
      <View style={styles.container}>
      <View style={styles.row}>
        <Form
          ref="form"
          type={Person}
          options={options}
        />
      </View>  
      <View style={styles.row}>
        <TouchableHighlight onPress={ ()=> this._signIn() } style={styles.button} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <Text style={styles.title} onPress={Actions.signUp}>Sign Up</Text>
        <Text style={styles.notification}>{this.state.message}</Text>
      </View>
      </View>
      </View>
    );
  }
}
   
var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: 'transparent',
  },
  stretch: {
    flex: 1,
    width: null,
    height: 350
  },
  title: {
    fontSize: 72,
    color: 'white',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 135
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
