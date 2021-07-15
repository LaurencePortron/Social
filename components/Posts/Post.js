import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image as RNImage } from 'react-native';

import { Image } from 'react-native-expo-image-cache';
import { useHistory } from 'react-router-native';
import moment from 'moment';
import { Feelings } from './Feelings';
import { useFirestoreDocument, useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';
import Avatar from '../Images/avatar.png';
import { Feather } from '@expo/vector-icons';
import { TaggedFriend } from '../Friends/TaggedFriend';

function Post({ post, isWith, postId }) {
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const db = firebase.firestore();
  const history = useHistory();

  const goToProfile = (id) => {
    history.push(`/profile/${id}`);
  };

  const goToTaggedUserProfile = (isWith) => {
    history.push(`/profile/${isWith}`);
  };

  const fetchUser = useFirestoreDocument(
    db.collection('accounts').doc(post.userId),
    []
  );

  const fetchComments = useFirestoreCollection(
    db.collection('posts').doc(post.id).collection('comments'),
    []
  );

  const numberOfComments = fetchComments.length;

  const addLikesToDb = () => {
    db.collection('posts')
      .doc(postId)
      .update({
        usersWhoLiked: firebase.firestore.FieldValue.arrayUnion(userId),
      });
  };

  const openPost = (postId) => {
    history.push(`/post/${postId}`);
  };

  if (!fetchUser) {
    return null;
  }

  if (!fetchComments) {
    return null;
  }

  console.log(numberOfComments);

  return (
    <View>
      <View>
        <View style={styles.userHeader}>
          {fetchUser.data.profilePicture ? (
            <TouchableOpacity onPress={() => goToProfile(post.userId)}>
              <Image
                uri={fetchUser.data.profilePicture}
                style={styles.avatarImage}
              />
            </TouchableOpacity>
          ) : (
            <RNImage source={Avatar} style={styles.avatarImage} />
          )}

          <View style={styles.detailsContainer}>
            <View style={styles.userfeelings}>
              <Text style={styles.userName}>{fetchUser.data.userName}</Text>
              <Feelings selectedFeeling={post.feeling} />
            </View>

            {isWith ? (
              <View style={styles.isWithContainer}>
                <TouchableOpacity onPress={() => goToTaggedUserProfile(isWith)}>
                  <TaggedFriend friendId={isWith} />
                </TouchableOpacity>
              </View>
            ) : null}

            <Text style={styles.date}>
              {moment(post.created.toDate()).format('MMM Do')}
            </Text>
          </View>
        </View>
        <Text style={styles.post}>{post.post}</Text>
      </View>
      <View style={styles.reactionData}>
        <View style={styles.reactionSection}>
          {post.usersWhoLiked ? (
            <Text style={styles.reactionText}>
              {post.usersWhoLiked.length} likes
            </Text>
          ) : (
            <Text style={styles.reactionText}>0 likes</Text>
          )}
        </View>
        <View style={styles.reactionSection}>
          {numberOfComments ? (
            <Text style={styles.reactionText}>{numberOfComments} comments</Text>
          ) : (
            <Text style={styles.reactionText}>0 comments</Text>
          )}
        </View>
      </View>

      <View style={styles.reactionContainer}>
        <TouchableOpacity onPress={() => addLikesToDb(userId)}>
          {(post.usersWhoLiked || []).find((user) => user === userId) ===
          undefined ? (
            <View style={styles.reactionSection}>
              <Text style={styles.heart}>&#x2661;</Text>
              <Text style={styles.reactionText}>Love</Text>
            </View>
          ) : (
            <View style={styles.reactionSection}>
              <Text style={styles.heartClicked}>&#x2665;</Text>
              <Text style={styles.reactionText}>Loved</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openPost(postId)}>
          <View style={styles.reactionSection}>
            <Feather name='message-square' size={25} color='grey' />
            <Text style={styles.reactionText}>Comment</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  userfeelings: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6CA9D6',
  },
  isWithContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  isWith: {
    fontSize: 18,
  },
  isWithUserName: { marginLeft: 5, fontSize: 18, fontWeight: 'bold' },
  avatarImage: { width: 40, height: 40, borderRadius: 50 },

  date: { color: '#A8A39F' },
  post: { fontSize: 22 },
  emojis: { fontSize: 18 },

  reactionData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#A2D8EB',
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

export { Post };
