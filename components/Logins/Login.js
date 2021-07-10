import React, { useState } from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import 'firebase/auth';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-native';

function Login(props) {
  const history = useHistory();
  const [getEmail, setGetEmail] = useState('');
  const [getPassword, setGetPassword] = useState('');

  const handleEmail = (inputText) => {
    setGetEmail(inputText);
  };

  const handlePassword = (inputText) => {
    setGetPassword(inputText);
  };

  const goToSignUp = () => {
    history.push(`/signup`);
  };

  const handleLogin = (event) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(getEmail, getPassword)
      .then(() => {
        history.push(`/dashboard`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ImageBackground
      source={require('../Images/wave.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.mainContainer}>
        <Text style={styles.welcomeTitle}>Welcome to Social</Text>
        <View style={styles.logInContainer}>
          <TextInput
            style={styles.textInput}
            textContentType='emailAddress'
            name='email'
            placeholder='Email'
            placeholderTextColor='black'
            inputText={getEmail}
            onChangeText={handleEmail}
            required
          />
          <TextInput
            style={styles.textInput}
            textContentType='password'
            name='password'
            placeholder='Password'
            placeholderTextColor='black'
            inputText={getPassword}
            onChangeText={handlePassword}
            secureTextEntry={true}
            required
          />
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.logInButton}>
            <Text style={styles.logIn}>Log in</Text>
            <Feather name='arrow-right' size={24} color='black' />
          </View>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <TouchableOpacity onPress={goToSignUp}>
            <Text style={styles.signUp}>Sign up here</Text>
          </TouchableOpacity>
          <Text style={styles.password}>Forgot Password</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  mainContainer: { marginLeft: 40 },
  welcomeTitle: {
    marginTop: 70,
    marginBottom: 40,
    fontSize: 50,
    fontWeight: 'bold',
  },
  logInContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50,
    marginRight: 40,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginTop: 20,
    margin: 10,
    paddingBottom: 10,
  },
  logInButton: {
    marginBottom: 40,
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logIn: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 10,
  },
  signUpContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 40,
    marginTop: 80,
  },
  signUp: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 15,
  },
  password: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export { Login };
