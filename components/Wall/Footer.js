import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

  const goToNotifications = () => {
    history.push(`/friendRequests/${profileId}/`);
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={goToWall}>
        <View style={styles.iconContainer}>
          <Feather name='home' size={25} color='white' />
          <Text style={styles.iconText}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToProfile}>
        <View style={styles.iconContainer}>
          <Feather name='user' size={25} color='white' />
          <Text style={styles.iconText}>Profile</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToNotifications}>
        <View style={styles.iconContainer}>
          <Feather name='bell' size={25} color='white' />
          <Text style={styles.iconText}>Notifications</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogOut}>
        <View style={styles.iconContainer}>
          <Feather name='log-out' size={25} color='white' />
          <Text style={styles.iconText}>Log out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    bottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
    backgroundColor: '#6CA9D6',
    width: '100%',
  },

  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconText: { color: 'white', marginTop: 3 },
});

export { Footer };
