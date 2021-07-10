import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/app';
import { useFirestoreDocument } from '../hooks';
import { useHistory } from 'react-router-native';

function EditProfile(props) {
  const history = useHistory();
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const db = firebase.firestore();
  const [updateBirthday, setUpdateBirthday] = useState('');
  const [updateLocation, setUpdateLocation] = useState('');

  const handleBirthdayUpdate = (inputText) => {
    setUpdateBirthday(inputText);
  };

  const handleLocationUpdate = (inputText) => {
    setUpdateLocation(inputText);
  };

  const getCurrentLoggedUser = useFirestoreDocument(
    firebase.firestore().collection('accounts').doc(userId),
    [userId]
  );

  if (!getCurrentLoggedUser) {
    return null;
  }
  const backToProfile = () => {
    history.push(`/profile/${userId}`);
  };

  const handleSaveChanges = () => {
    db.collection('accounts').doc(userId).update({
      birthday: updateBirthday,
      location: updateLocation,
    });
    history.push(`/profile/${userId}`);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => backToProfile(userId)}>
          <Feather name='chevron-left' size={34} color='black' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSaveChanges}>
          <Text style={styles.postButton}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileSection}>
          <Text style={styles.userPlaceHolder}>Profile Picture:</Text>
          <Image
            source={{ uri: getCurrentLoggedUser.data.profilePicture }}
            style={styles.profilePicture}
          />
        </View>
        <View style={styles.profileSection}>
          <Text style={styles.userPlaceHolder}>Cover Photo:</Text>
          <Image
            source={{ uri: getCurrentLoggedUser.data.profilePicture }}
            style={styles.profilePicture}
          />
        </View>
        <View style={styles.profileSection}>
          <Text style={styles.userPlaceHolder}>Username:</Text>
          <TextInput
            style={styles.userData}
            textContentType='name'
            name='username'
            placeholder='Username'
            placeholderTextColor='#A8A39F'
          />
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.userPlaceHolder}>Email:</Text>
          <TextInput
            style={styles.userData}
            textContentType='emailAddress'
            name='email'
            placeholder='Email'
            placeholderTextColor='#A8A39F'
          />
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.userPlaceHolder}>Location</Text>
          <TextInput
            style={styles.userData}
            name='location'
            placeholder='Location'
            placeholderTextColor='#A8A39F'
            onChangeText={handleLocationUpdate}
            inputText={updateLocation}
          />
        </View>
        <View style={styles.profileSection}>
          <Text style={styles.userPlaceHolder}>Birthday</Text>
          <TextInput
            style={styles.userData}
            textContentType='emailAddress'
            name='birthday'
            placeholder='Birthday'
            placeholderTextColor='#A8A39F'
            onChangeText={handleBirthdayUpdate}
            inputText={updateBirthday}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { width: '100%' },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
    padding: 15,
  },
  headerTitle: { fontWeight: 'bold', fontSize: 25 },

  postButton: { fontWeight: 'bold', fontSize: 25, color: '#A8A39F' },
  profilePicture: { width: 100 },
  userName: { fontSize: 18, fontWeight: 'bold' },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  userPlaceHolder: { fontSize: 20, fontWeight: 'bold' },
  userData: { marginLeft: 10, fontSize: 18 },
});

export { EditProfile };
