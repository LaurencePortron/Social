import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { DashboardHeader } from './DashboardHeader';
import { useFirestoreDocument } from './hooks';
import { Wall } from './Wall';
import Avatar from './avatar.png';
import firebase from 'firebase/app';
import { Footer } from './Footer';
import { useHistory } from 'react-router-native';

function Dashboard(props) {
  const user = firebase.auth().currentUser;
  const profileId = user.uid;
  const db = firebase.firestore();
  const history = useHistory();

  const fetchAccounts = useFirestoreDocument(
    db.collection('accounts').doc(profileId),
    [profileId]
  );

  if (!fetchAccounts) {
    return null;
  }

  const goToAddPost = () => {
    history.push(`/addPost`);
  };

  return (
    <ScrollView>
      <DashboardHeader />
      <TouchableOpacity onPress={goToAddPost}>
        <View style={styles.mainSection}>
          <Image
            source={{ uri: fetchAccounts.data.profilePicture }}
            style={styles.avatarImage}
          />
          <Text style={styles.postText}>Whats on your mind..</Text>
        </View>
      </TouchableOpacity>
      <Wall profileId={profileId} />
      <Footer profileId={profileId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'white',
    padding: 20,
  },
  postText: { color: '#A8A39F', fontSize: 18 },
  avatarImage: { width: 40, height: 40, borderRadius: 50, marginRight: 10 },
});

export { Dashboard };
