import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Feather } from '@expo/vector-icons';
import { PageHeaders } from './PageHeaders';
import { useFirestoreDocument, useFirestoreCollection } from './hooks';
import firebase from 'firebase/app';
import Avatar from './avatar.png';

function FriendRequests(props) {
  const history = useHistory();
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const fetchFriends = useFirestoreCollection(
    db.collection('accounts').doc(userId).collection('friends'),
    []
  );

  const getFriendsName = useFirestoreDocument(
    db.collection('accounts').doc('nhWbXajOfRU1AEKNqAbW79OB4N32'),
    []
  );

  // console.log(getFriendsName);

  // users that made a friend request

  const friendRequests = fetchFriends.map((friend) => {
    if (friend.data.requestAccepted === false) {
      return friend.id;
    }
  });

  // console.log('friendRequests', friendRequests);

  // friends you requested to add

  // const requestedFriends = fetchFriends.map((friend) => {
  //   if (friend.data.isFriend === false) {
  //     return friend.id;
  //   }
  // });

  // console.log('requestedFriends', requestedFriends);

  const confirmFriendRequest = (request) => {
    db.collection('accounts')
      .doc(request)
      .collection('friends')
      .doc(userId)
      .update({
        isFriend: true,
        friendsSince: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    db.collection('accounts')
      .doc(userId)
      .collection('friends')
      .doc(request)
      .update({
        requestAccepted: true,
        friendsSince: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    history.push(`/dashboard`);
  };

  return (
    <View style={styles.requestContainer}>
      <PageHeaders placeholder='Back to Wall' />
      <View>
        <Text style={styles.requestTitle}>Friend Requests</Text>
        {friendRequests.map((request) => {
          if (request !== undefined) {
            return (
              <View style={styles.requests}>
                <Image source={Avatar} style={styles.avatarImage} />
                <View style={styles.friendSection}>
                  <Text style={styles.request}>{request}</Text>
                  <View style={styles.buttons}>
                    <TouchableOpacity
                      onPress={() => confirmFriendRequest(request)}
                    >
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
              </View>
            );
          }
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  requestContainer: {
    backgroundColor: 'white',
  },
  requestTitle: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  requests: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
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
  buttons: { display: 'flex', flexDirection: 'row' },
});

export { FriendRequests };
