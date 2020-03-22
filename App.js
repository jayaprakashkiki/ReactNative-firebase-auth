import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Share } from 'react-native';
import { Content, Card, CardItem, Body, Container, Button, Input, Form, Item, H1 } from 'native-base';
import * as Speech from 'expo-speech';
import firebase from './firebase';

export default class FetchExample extends React.Component {

  constructor() {
    super();
   
    this.db = firebase.firestore().collection('sample')
    this.auth = firebase.auth()
    this.state = {
      username: '',
      password: '',
      createdAt: Date.now(),

    }
  }


  SignUp() {
    const email = this.state.username;
    const password = this.state.password;
    try {
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };


  Login() {
    const email = this.state.username;
    const password = this.state.password;
    try {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res.user.email);
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  async reset() {
    const email = this.state.username; 
    try {
      this.auth.sendPasswordResetEmail(email);
      console.log('sended');

    } catch (e) {

      alert(
        e.message
      );
    }
  };



  render() {
    return (
      <Container>
        <Content>
          <H1 style={{ textAlign: 'center' }}>SignUp</H1>
          <Form>
            <Item style={{ marginBottom: 20 }}>
              <Input placeholder='username' onChangeText={(Text) => this.setState({ username: Text })}></Input>
            </Item>
            <Item style={{ marginBottom: 20 }}>
              <Input placeholder='password' onChangeText={(Text) => this.setState({ password: Text })}></Input>
            </Item>
          </Form>
          <Button full block>
            <Text style={{ color: 'white' }} onPress={() => this.SignUp()}>Signup</Text>
          </Button>
          <H1 style={{ textAlign: 'center', marginBottom: 20 }}>SignIn</H1>
          <Form>
            <Item style={{ marginBottom: 20 }}>
              <Input placeholder='username' onChangeText={(Text) => this.setState({ username: Text })}></Input>
            </Item>
            <Item style={{ marginBottom: 20 }}>
              <Input placeholder='password' onChangeText={(Text) => this.setState({ password: Text })}></Input>
            </Item>
          </Form>
          <Button full block>
            <Text style={{ color: 'white' }} onPress={() => this.Login()}>Login</Text>
          </Button>
          <Button full block>
            <Text style={{ color: 'white' }} onPress={() => this.reset()}>Reset</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
