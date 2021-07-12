import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import { useFirestoreCollection, useFirestoreDocument } from '../hooks';
import { useHistory } from 'react-router-native';
import { Post } from '../Posts/Post';

function Wall({ profileId }) {
  const db = firebase.firestore();
  const history = useHistory();

  const fetchPosts = useFirestoreCollection(
    db.collection('posts').orderBy('created', 'desc'),
    []
  );

  const fetchAccounts = useFirestoreCollection(db.collection('accounts'), []);

  const getUserProfileInfo = useFirestoreDocument(
    db.collection('accounts').doc(profileId),
    []
  );

  const getUsersFriends = useFirestoreCollection(
    db.collection('accounts').doc(profileId).collection('friends'),
    []
  );

  const getFriendIds = getUsersFriends.map((friend) => {
    if (friend.data.isFriend === true || friend.data.requestAccepted === true) {
      return friend.id;
    }
  });

  if (!getUserProfileInfo) {
    return null;
  }

  if (!fetchAccounts) {
    return null;
  }

  if (!getFriendIds) {
    return null;
  }

  return (
    <View style={styles.postContainer}>
      {fetchPosts.map((post) => {
        if (
          profileId === post.data.userId ||
          getFriendIds.includes(post.data.userId)
        ) {
          return (
            <View key={post.id} style={styles.postSection}>
              <Post
                idOfUser={post.data.userId}
                selectedFeeling={post.data.feeling}
                postCreated={post.data.created}
                postContent={post.data.post}
                postId={post.id}
                isWith={post.data.isWith}
              />
            </View>
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginTop: 10,
    backgroundColor: '#ECE6E0',
  },
  postSection: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
  },
});

export { Wall };
