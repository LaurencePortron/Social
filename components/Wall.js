import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import { useFirestoreCollection, useFirestoreDocument } from './hooks';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';
import moment from 'moment';

function Wall({ profileId }) {
  const [isLiked, setIsLiked] = useState(false);
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const db = firebase.firestore();
  const history = useHistory();

  const fetchPosts = useFirestoreCollection(
    db.collection('posts').orderBy('created', 'desc'),
    []
  );

  const fetchAccounts = useFirestoreCollection(db.collection('accounts'), []);

  const getUserProfileInfo = useFirestoreDocument(
    db.collection('accounts').doc(profileId),
    [profileId]
  );

  if (!getUserProfileInfo) {
    return null;
  }

  const goToProfile = (userId) => {
    history.push(`/profile/${userId}`);
  };

  const addLikesToDb = (postId) => {
    db.collection('posts').doc(postId).update({
      isLiked: true,
    });
    setIsLiked(!isLiked);
  };

  const getUserName = fetchAccounts.map((username) => {
    if (userId === username.id) {
      return username.data.userName;
    }
  });

  const openPost = (postId) => {
    history.push(`/post/${postId}`);
  };

  // const fetchComments = useFirestoreCollection(
  //   db.collection('posts').doc(postId).collection('comments')[postId]
  // );

  return (
    <View style={styles.postContainer}>
      {fetchPosts.map((post) => {
        if (profileId === post.data.userId) {
          return (
            <View key={post.id} style={styles.postSection}>
              <View style={styles.userHeader}>
                <TouchableOpacity onPress={() => goToProfile(userId)}>
                  <Image
                    source={{ uri: getUserProfileInfo.data.profilePicture }}
                    style={styles.avatarImage}
                  />
                </TouchableOpacity>
                <View style={styles.detailsContainer}>
                  <Text style={styles.userName}>{getUserName}</Text>
                  <Text style={styles.date}>
                    {moment(post.data.created.toDate()).format('MMM Do')}
                  </Text>
                </View>
              </View>

              <Text style={styles.post}>{post.data.post}</Text>

              <View style={styles.reactionData}>
                <View style={styles.reactionSection}>
                  {post.data.isLiked ? (
                    <Text style={styles.reactionText}>1 love</Text>
                  ) : (
                    <Text style={styles.reactionText}>0 love</Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => openPost(post.id)}>
                  <View style={styles.reactionSection}>
                    <Text style={styles.reactionText}>2 comments</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.reactionContainer}>
                <TouchableOpacity onPress={() => addLikesToDb(post.id)}>
                  {post.data.isLiked ? (
                    <View style={styles.reactionSection}>
                      <Text style={styles.heartClicked}>&#x2665;</Text>
                      <Text style={styles.reactionText}>Unlove</Text>
                    </View>
                  ) : (
                    <View style={styles.reactionSection}>
                      <Text style={styles.heart}>&#x2661;</Text>
                      <Text style={styles.reactionText}>Love</Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openPost(post.id)}>
                  <View style={styles.reactionSection}>
                    <Feather name='message-square' size={25} color='grey' />
                    <Text style={styles.reactionText}>Comment</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
  userHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarImage: { width: 40, height: 40 },
  userName: { fontWeight: 'bold' },
  date: { color: '#A8A39F' },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  post: { fontSize: 18 },
  reactionData: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
    padding: 10,
  },
  reactionSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heart: { color: 'grey', fontSize: 28 },
  heartClicked: { color: 'red', fontSize: 28 },
  reactionText: {
    marginLeft: 10,
    color: 'grey',
  },

  reactionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: 10,
  },
});

export { Wall };
