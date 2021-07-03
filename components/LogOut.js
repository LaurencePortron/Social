import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-native';
import { useFirestoreDocument } from './hooks';

function LogOut(props) {
  const history = useHistory();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const handleLogOut = (event) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('successfully logged out');
        history.push(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCurrentLoggedUser = useFirestoreDocument(
    firebase.firestore().collection('accounts').doc(userId),
    [userId]
  );

  if (!getCurrentLoggedUser) {
    return null;
  }

  console.log(getCurrentLoggedUser);

  return (
    <View style={styles.logOutContainer}>
      <View style={styles.logOut}>
        <Text style={styles.editInfoText} onPress={handleLogOut}>
          Log Out
        </Text>
        <Feather name='log-out' size={25} color='black' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logOutContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
  },
  editInfoText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 10,
  },
  logOut: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});

export { LogOut };
