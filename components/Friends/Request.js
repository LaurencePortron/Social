import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { useFirestoreDocument } from '../hooks';
import firebase from 'firebase/app';
import Avatar from '../Images/avatar.png';

function Request({ friendId, userId }) {
  const history = useHistory();
  const db = firebase.firestore();

  const fetchUserInfo = useFirestoreDocument(
    db.collection('accounts').doc(friendId),
    []
  );

  if (!fetchUserInfo) {
    return null;
  }

  const confirmFriendRequest = (friendId) => {
    db.collection('accounts')
      .doc(friendId)
      .collection('friends')
      .doc(userId)
      .update({
        isFriend: true,
        friendsSince: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    db.collection('accounts')
      .doc(userId)
      .collection('friends')
      .doc(friendId)
      .update({
        requestAccepted: true,
        friendsSince: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    db.collection('accounts')
      .doc(friendId)
      .collection('friendsNotifications')
      .doc(userId)
      .set({
        friends: userId,
        isFriend: true,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        markedAsRead: false,
      });
    history.push(`/dashboard`);
  };

  return (
    <View style={styles.requests} key={friendId}>
      <View style={styles.profileInfoContainer}>
        {fetchUserInfo.data.profilePicture ? (
          <Image
            source={{ uri: fetchUserInfo.data.profilePicture }}
            style={styles.avatarImage}
          />
        ) : (
          <Image source={Avatar} style={styles.avatarImage} />
        )}
        <Text style={styles.userName}>{fetchUserInfo.data.userName}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => confirmFriendRequest(friendId)}>
          <View style={styles.friendRequestButton}>
            <Text style={styles.buttonPlaceholder}>Confirm</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.removeButton}>
            <Text style={styles.buttonPlaceholder}>Remove</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  requests: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 10,
  },
  profileInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatarImage: {
    marginLeft: 10,
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  userName: { fontSize: 20, fontWeight: 'bold' },
  buttons: { display: 'flex', flexDirection: 'row' },
  friendRequestButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6CA9D6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  removeButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  buttonPlaceholder: { fontSize: 18 },
  friendSection: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export { Request };
