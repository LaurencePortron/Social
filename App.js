import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Redirect, Route } from 'react-router-native';
import { Login } from './components/Logins/Login';
import { SignUp } from './components/Logins/SignUp';
import { Dashboard } from './components/Wall/Dashboard';
import { UserContext } from './components/Context';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Profile } from './components/Profile/Profile';
import { OpenPost } from './components/Posts/OpenPost';
import { EditProfile } from './components/Profile/EditProfile';
import { AddPost } from './components/Posts/AddPost';
import { FeelingsActivities } from './components/Posts/FeelingsActivities';
import { FriendRequests } from './components/Friends/FriendRequests';
import { FriendsList } from './components/Friends/FriendsList';

var firebaseConfig = {
  apiKey: 'AIzaSyDsxrCO7UQTovxcf-_IYc5I3yx4Q9orDAc',
  authDomain: 'socialmedia-46620.firebaseapp.com',
  projectId: 'socialmedia-46620',
  storageBucket: 'socialmedia-46620.appspot.com',
  messagingSenderId: '522706429761',
  appId: '1:522706429761:web:427121c74f8910cdd7e3c0',
  measurementId: 'G-ZN2HNETDG8',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <NativeRouter>
        <View style={styles.container}>
          {user ? (
            <Redirect from='/' to='/dashboard' />
          ) : (
            <Route exact path='/' component={Login} />
          )}
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/profile/:id' component={Profile} />
          <Route exact path='/editProfile/:id' component={EditProfile} />
          <Route exact path='/addPost' component={AddPost} />

          <Route exact path='/post/:id/' component={OpenPost} />
          <Route
            exact
            path='/feelingsActivities'
            component={FeelingsActivities}
          />
          <Route exact path='/friendRequests/:id/' component={FriendRequests} />
          <Route exact path='/friends/:id/' component={FriendsList} />
        </View>
      </NativeRouter>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE6E0',
  },
});
