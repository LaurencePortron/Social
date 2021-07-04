import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { LogOut } from './LogOut';
import { Header } from './Header';
import { CustomModal } from './CustomModal';
import { Wall } from './Wall';
import Avatar from './avatar.png';
import firebase from 'firebase/app';

function Dashboard(props) {
  const user = firebase.auth().currentUser;
  const profileId = user.uid;
  const db = firebase.firestore();

  const placeholder = (
    <View style={styles.mainSection}>
      <Image source={Avatar} style={styles.avatarImage} />
      <Text style={styles.postText}>Whats on your mind..</Text>
    </View>
  );

  return (
    <ScrollView>
      <Header />
      <CustomModal placeholder={placeholder} />
      <Wall profileId={profileId} />
      <LogOut />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  postText: { color: '#A8A39F', fontSize: 18 },
});

export { Dashboard };
