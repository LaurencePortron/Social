import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFirestoreDocument } from '../hooks';
import firebase from 'firebase/app';
import Avatar from '../Images/avatar.png';
import moment from 'moment';
import { Image } from 'react-native-expo-image-cache';
import { Image as RNImage } from 'react-native';

function Comments({ comment }) {
  const db = firebase.firestore();

  const fetchUser = useFirestoreDocument(
    db.collection('accounts').doc(comment.user),
    []
  );

  if (!fetchUser) {
    return null;
  }

  return (
    <View style={styles.commentContainer}>
      <View key={comment.id} style={styles.commentSection}>
        {fetchUser.data.profilePicture ? (
          <TouchableOpacity>
            <Image
              uri={fetchUser.data.profilePicture}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
        ) : (
          <RNImage source={Avatar} style={styles.avatarImage} />
        )}
        <View>
          <View style={styles.comment}>
            <Text style={styles.userName}>{fetchUser.data.userName}</Text>
            <Text>{comment.postComment}</Text>
          </View>
          <Text style={styles.date}>
            {moment(comment.created.toDate()).format('MMM Do')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: { backgroundColor: 'white' },
  commentSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    marginLeft: 10,
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 50,
  },

  comment: {
    backgroundColor: '#F6F6F6',
    marginTop: 10,
    maxWidth: 600,
    maxHeight: 100,
    padding: 10,
    borderRadius: 10,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: { fontSize: 13, marginTop: 2 },
});

export { Comments };
