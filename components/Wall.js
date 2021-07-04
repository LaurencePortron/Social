import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from './avatar.jpg';
import firebase from 'firebase/app';
import { useFirestoreCollection } from './hooks';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';

function Wall({ profileId }) {
  const [isLiked, setIsLiked] = useState(false);
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const db = firebase.firestore();
  const history = useHistory();

  const fetchPosts = useFirestoreCollection(
    db.collection('posts').orderBy('date', 'desc'),
    []
  );

  const fetchAccounts = useFirestoreCollection(db.collection('accounts'), []);

  const goToProfile = (userId) => {
    history.push(`/profile/${userId}`);
  };

  const handleLikes = () => {
    setIsLiked(!isLiked);
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

  console.log(profileId);
  // console.log('lolo', userId);

  // you need to get the userId of the person's profile been clicked on NOT THE CURRENT PROFILE

  // currently gettinh both ids on Profile click (logged in & clicked on user)

  return (
    <View style={styles.postContainer}>
      {fetchPosts.map((post) => {
        // console.log('samy', post.data.userId);
        if (profileId === post.data.userId) {
          return (
            <View key={post.id} style={styles.postSection}>
              <View style={styles.userHeader}>
                <TouchableOpacity onPress={() => goToProfile(userId)}>
                  <Image source={Avatar} style={styles.avatarImage} />
                </TouchableOpacity>
                <View style={styles.detailsContainer}>
                  <Text style={styles.userName}>{getUserName}</Text>
                  <Text style={styles.date}>{post.data.date.nanoseconds}</Text>
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
                <View style={styles.reactionSection}>
                  <Text style={styles.reactionText}> 13 comments</Text>
                </View>
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
                <View style={styles.reactionSection}>
                  <Feather name='message-square' size={25} color='grey' />
                  <Text style={styles.reactionText}>Comment</Text>
                </View>
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
