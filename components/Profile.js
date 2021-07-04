import React from 'react';
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

  return (
    <ScrollView>
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
});
export { Profile };
