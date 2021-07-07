import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useFirestoreCollection } from './hooks';
import firebase from 'firebase/app';
import Avatar from './avatar.png';
import moment from 'moment';

function Comments({ postId }) {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const fetchComments = useFirestoreCollection(
    db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('created', 'asc'),
    [postId]
  );
  const fetchAccounts = useFirestoreCollection(db.collection('accounts'), []);

  const getUserName = fetchAccounts.map((username) => {
    if (userId === username.id) {
      return username.data.userName;
    }
  });

  return (
    <View style={styles.commentContainer}>
      {fetchComments.map((comment) => {
        return (
          <View key={comment.id} style={styles.commentSection}>
            <Image source={Avatar} style={styles.avatarImage} />
            <View>
              <View style={styles.comment}>
                <Text style={styles.userName}>Pete</Text>
                <Text>{comment.data.postComment}</Text>
              </View>
              <Text style={styles.date}>
                {moment(comment.data.created.toDate()).format('MMM Do')}
              </Text>
            </View>
          </View>
        );
      })}
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
