import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-native';

function Footer({ profileId }) {
  const history = useHistory();

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

  const goToProfile = () => {
    history.push(`/profile/${profileId}`);
  };

  const goToWall = () => {
    history.push(`/dashboard`);
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={goToWall}>
        <Feather name='home' size={25} color='white' style={styles.bell} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToProfile}>
        <Feather name='user' size={25} color='white' style={styles.bell} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name='bell' size={25} color='white' style={styles.bell} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogOut}>
        <Feather name='log-out' size={25} color='white' style={styles.bell} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    bottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
    backgroundColor: '#6CA9D6',
    width: '100%',
  },
});

export { Footer };
