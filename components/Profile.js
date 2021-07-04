import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase/app';
import { useFirestoreDocument } from './hooks';
import Wave from './wave.jpg';
import Lolo from './lolo.jpg';
import { useHistory } from 'react-router-native';
import { Feather } from '@expo/vector-icons';
import { Wall } from './Wall';
import { CustomModal } from './CustomModal';

function Profile(props) {
  const history = useHistory();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const getCurrentLoggedUser = useFirestoreDocument(
    firebase.firestore().collection('accounts').doc(userId),
    [userId]
  );

  if (!getCurrentLoggedUser) {
    return null;
  }

  const backToDashboard = () => {
    history.push(`/dashboard`);
  };

  const placeholder = (
    <View style={styles.editProfileButton}>
      <Feather name='settings' size={24} color='black' />
      <Text style={styles.editProfilePlaceholder}>Edit Profile</Text>
    </View>
  );

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.headerSection}>
        <TouchableOpacity onPress={backToDashboard}>
          <View style={styles.profileHeader}>
            <Feather name='chevron-left' size={40} color='black' />
          </View>
        </TouchableOpacity>
        <Image source={Wave} style={styles.coverImage} />
        <View style={styles.profileImageSection}>
          <Image source={Lolo} style={styles.profileImage} />
        </View>
        <Text style={styles.userName}>
          {getCurrentLoggedUser.data.userName}
        </Text>
      </View>
      <View style={styles.profileOptions}>
        <CustomModal placeholder={placeholder} />

        <TouchableOpacity>
          <View style={styles.editProfileButton}>
            <Feather name='settings' size={24} color='black' />
            <Text style={styles.editProfilePlaceholder}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfoContainer}>
        <View style={styles.profileInfoSection}>
          <Feather name='map-pin' size={24} color='black' />
          <Text style={styles.infoPlaceholder}>Lives in </Text>
        </View>
        <View style={styles.profileInfoSection}>
          <Feather name='clock' size={24} color='black' />
          <Text style={styles.infoPlaceholder}>Joined </Text>
        </View>
        <View style={styles.profileInfoSection}>
          <Feather name='gift' size={24} color='black' />
          <Text style={styles.infoPlaceholder}>Birthday</Text>
        </View>
      </View>
      <Wall />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerSection: { marginBottom: 100 },
  profileHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  coverImage: { width: '100%', height: 150 },
  profileImageSection: {
    position: 'absolute',
    top: 90,
    left: 90,
  },
  profileImage: {
    borderRadius: 300,
    width: 200,
    height: 200,
    borderWidth: 5,
    borderColor: 'white',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    top: 100,
  },
  profileOptions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  editProfileButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    padding: 10,
    borderRadius: 10,
    width: 150,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
  },
  editProfilePlaceholder: { marginLeft: 10, fontSize: 18 },
  profileInfoContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
  },

  profileInfoSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20,
  },
  infoPlaceholder: { marginLeft: 10, fontSize: 16, fontWeight: 'bold' },
});
export { Profile };