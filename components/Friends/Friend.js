import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFirestoreDocument } from '../hooks';
import firebase from 'firebase/app';
import Avatar from '../Images/avatar.png';
import moment from 'moment';
import { useHistory } from 'react-router-native';
import { Image as RNImage } from 'react-native';

function Friend({ friendId, friendsSince }) {
  const db = firebase.firestore();
  const history = useHistory();

  const fetchFriendInfo = useFirestoreDocument(
    db.collection('accounts').doc(friendId),
    []
  );

  if (!fetchFriendInfo) {
    return null;
  }
  const goToProfile = (friendId) => {
    history.push(`/profile/${friendId}`);
  };

  return (
    <View style={styles.friends}>
      {fetchFriendInfo.data.profilePicture ? (
        <TouchableOpacity onPress={() => goToProfile(friendId)}>
          <Image
            uri={fetchFriendInfo.data.profilePicture}
            style={styles.avatarImage}
          />
        </TouchableOpacity>
      ) : (
        <RNImage source={Avatar} style={styles.avatarImage} />
      )}
      <View style={styles.friendsData}>
        <Text style={styles.userName}>{fetchFriendInfo.data.userName}</Text>
        <Text>
          Friends since {moment(friendsSince.toDate()).format('MMM Do')}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  friends: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: 10,
    marginTop: 20,
  },
  avatarImage: { width: 40, height: 40, borderRadius: 50 },

  friendsData: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export { Friend };
