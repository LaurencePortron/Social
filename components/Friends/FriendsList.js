import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';
import { PageHeaders } from '../AppComponents/PageHeaders';
import { useHistory } from 'react-router-native';
import { Friend } from './Friend';

function FriendsList(props) {
  const history = useHistory();
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const fetchFriends = useFirestoreCollection(
    db.collection('accounts').doc(userId).collection('friends'),
    []
  );

  const goToFriendProfile = (friendId) => {
    history.push(`/profile/${friendId}`);
  };

  const backToUserProfile = () => {
    history.push(`/profile/${userId}`);
  };

  return (
    <View style={styles.friendsContainer}>
      <PageHeaders
        placeholder='backToProfile'
        onPressNavigation={backToUserProfile}
      />
      <Text style={styles.friendsTitle}>Friends</Text>
      {fetchFriends.map((friend) => {
        const friendId = friend.id;
        if (
          friend.data.requestAccepted === true ||
          friend.data.isFriend === true
        )
          return (
            <TouchableOpacity
              onPress={() => goToFriendProfile(friendId)}
              key={friend.id}
            >
              <Friend
                key={friend.id}
                friendId={friend.id}
                friendsSince={friend.data.friendsSince}
              />
            </TouchableOpacity>
          );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  friendsContainer: {},
  friendsTitle: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export { FriendsList };
