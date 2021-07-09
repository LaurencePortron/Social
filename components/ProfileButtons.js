import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// component for own profile buttons (edit profile + Friends)
// conditions: profileId !== userId (??)

// component for random user button (Add Friend + About)
// conditions:  if this -> const userProfile = useFirestoreCollection(
//   db.collection('accounts').doc(userId).collection('friends').doc(profileId),
//   []
// );
// userProfile === undefined || null

// component for friend buttons (Friends + About)
// conditions:  if this -> const userProfile = useFirestoreCollection(
//   db.collection('accounts').doc(userId).collection('friends').doc(profileId),
//   []
// );
// userProfile.data.requestAccepted || userProfile.data.isFriend === true

// component for requested friends buttons (requested + About)
// conditions:  if this -> const userProfile = useFirestoreCollection(
//   db.collection('accounts').doc(userId).collection('friends').doc(profileId),
//   []
// );
// userProfile.data.requestAccepted || userProfile.data.isFriend === false

//var icon = (area == 1) ? icon1 : (area == 2) ? icon2 : icon0;

function ProfileButtons({
  onPressNavigationSecondButton,
  onPressNavigationFirstButton,
  firstPlaceholder,
  secondPlaceholder,
}) {
  return (
    <View style={styles.profileOptions}>
      <TouchableOpacity onPress={onPressNavigationFirstButton}>
        <View style={styles.editProfileButton}>
          <Feather name='edit' size={24} color='black' />
          <Text style={styles.editProfilePlaceholder}>{firstPlaceholder}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressNavigationSecondButton}>
        <View style={styles.editProfileButton}>
          <Feather name='users' size={24} color='black' />
          <Text style={styles.editProfilePlaceholder}>{secondPlaceholder}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileOptions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
});

// TO BE DONE :
// {
//   !fetchFriends ? null : userId !== userId ? (
//     <ProfileButtons
//       onPressNavigationFirstButton={goToEditProfile}
//       onPressNavigationSecondButton={goToFriends}
//       firstPlaceholder='Edit Profile'
//       secondPlaceholder='Friends'
//     />
//   ) : fetchFriends === undefined ? (
//     <ProfileButtons
//       onPressNavigationFirstButton={goToEditProfile}
//       onPressNavigationSecondButton={goToFriends}
//       firstPlaceholder='Add Friend'
//       secondPlaceholder='About'
//     />
//   ) : (fetchFriends.data.requestAccepted !== undefined &&
//       fetchFriends.data.isFriend !== undefined &&
//       fetchFriends.data.requestAccepted === true) ||
//     fetchFriends.data.isFriend === true ? (
//     <ProfileButtons
//       onPressNavigationFirstButton={goToEditProfile}
//       onPressNavigationSecondButton={goToFriends}
//       firstPlaceholder='Friends'
//       secondPlaceholder='About'
//     />
//   ) : fetchFriends.data.requestAccepted ||
//     fetchFriends.data.isFriend === false ? (
//     <ProfileButtons
//       onPressNavigationFirstButton={goToEditProfile}
//       onPressNavigationSecondButton={goToFriends}
//       firstPlaceholder='Requested'
//       secondPlaceholder='About'
//     />
//   ) : null;
// }

export { ProfileButtons };
