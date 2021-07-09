import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import { useFirestoreCollection, useFirestoreDocument } from './hooks';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';
import moment from 'moment';
import { Feelings } from './Feelings';
import Avatar from './avatar.png';

function Wall({ profileId }) {
  const [isLiked, setIsLiked] = useState(false);
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

  const goToProfile = (id) => {
    history.push(`/profile/${id}`);
  };

  const addLikesToDb = (postId) => {
    db.collection('posts').doc(postId).update({
      isLiked: true,
    });
    setIsLiked(!isLiked);
  };

  const openPost = (postId) => {
    history.push(`/post/${postId}`);
  };

  return (
    <View style={styles.postContainer}>
      {fetchPosts.map((post) => {
        const idOfUser = post.data.userId;
        if (
          profileId === post.data.userId ||
          getFriendIds.includes(post.data.userId)
        ) {
          return (
            <View key={post.id} style={styles.postSection}>
              <View style={styles.userHeader}>
                {getUserProfileInfo.data.profilePicture ? (
                  <TouchableOpacity onPress={() => goToProfile(idOfUser)}>
                    <Image
                      source={{ uri: getUserProfileInfo.data.profilePicture }}
                      style={styles.avatarImage}
                    />
                  </TouchableOpacity>
                ) : (
                  <Image source={Avatar} style={styles.avatarImage} />
                )}

                <View style={styles.detailsContainer}>
                  <View style={styles.userfeelings}>
                    <Text style={styles.userName}>{post.data.userId}</Text>
                    <Feelings selectedFeeling={post.data.feeling} />
                  </View>
                  <Text style={styles.date}>
                    {moment(post.data.created.toDate()).format('MMM Do')}
                  </Text>
                </View>
              </View>

              <Text style={styles.post}>{post.data.post}</Text>

              <View style={styles.reactionData}>
                <View style={styles.reactionSection}>
                  {post.data.isLiked ? (
                    <Text style={styles.reactionText}>1 like</Text>
                  ) : (
                    <Text style={styles.reactionText}>0 like</Text>
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
  avatarImage: { width: 40, height: 40, borderRadius: 50 },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6CA9D6',
  },
  emojis: { fontSize: 18 },
  date: { color: '#A8A39F' },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  userfeelings: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  post: { fontSize: 22 },
  reactionData: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export { Wall };
