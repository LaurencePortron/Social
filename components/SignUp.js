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

function SignUp(props) {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUserName = (inputText) => {
    setUserName(inputText);
  };

  const registerEmail = (inputText) => {
    setEmail(inputText);
  };

  const registerPassword = (inputText) => {
    setPassword(inputText);
  };

  const goToSignIn = () => {
    history.push(`/signup`);
  };

  const handleRegisterSubmit = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() =>
        firebase
          .firestore()
          .collection('accounts')
          .doc(firebase.auth().currentUser.uid)
          .set({
            userName: userName,
            email: email,
            password: password,
          })
      )
      .then(() => {
        history.push(`/dashboard`);
      })
      .catch((error) => {
        console.log('error when signing up', error);
      });
  };

  return (
    <ImageBackground
      source={require('./wave.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.mainContainer}>
        <Text style={styles.welcomeTitle}>Create Account</Text>
        <View style={styles.logInContainer}>
          <TextInput
            style={styles.textInput}
            textContentType='name'
            name='name'
            placeholder='Name'
            placeholderTextColor='black'
            inputText={userName}
            onChangeText={registerUserName}
            required
          />
          <TextInput
            style={styles.textInput}
            textContentType='emailAddress'
            name='email'
            placeholder='Email'
            placeholderTextColor='black'
            inputText={email}
            onChangeText={registerEmail}
            required
          />
          <TextInput
            style={styles.textInput}
            textContentType='password'
            name='password'
            placeholder='Password'
            placeholderTextColor='black'
            inputText={password}
            onChangeText={registerPassword}
            secureTextEntry={true}
            required
          />
        </View>

        <TouchableOpacity onPress={handleRegisterSubmit}>
          <View style={styles.logInButton}>
            <Text style={styles.logIn}>Sign up</Text>
            <Feather name='arrow-right' size={24} color='black' />
          </View>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <TouchableOpacity onPress={goToSignIn}>
            <Text style={styles.signUp}>Sign in</Text>
          </TouchableOpacity>
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
    marginBottom: 30,
    fontSize: 50,
    fontWeight: 'bold',
  },
  logInContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 30,
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
    marginTop: 40,
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

export { SignUp };
