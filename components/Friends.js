import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFirestoreDocument, useFirestoreCollection } from './hooks';
import firebase from 'firebase/app';
import moment from 'moment';
import { PageHeaders } from './PageHeaders';
import Avatar from './avatar.png';
import { useHistory } from 'react-router-native';

function Friends(props) {
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
            <TouchableOpacity onPress={() => goToFriendProfile(friendId)}>
              <View style={styles.friends}>
                <Image source={Avatar} style={styles.avatarImage} />
                <View style={styles.friendsData}>
                  <Text>{friend.id}</Text>
                  <Text>
                    Friends since{' '}
                    {moment(friend.data.friendsSince.toDate()).format('MMM Do')}
                  </Text>
                </View>
              </View>
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
  friends: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: 10,
    marginTop: 10,
  },
  friendsData: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export { Friends };
