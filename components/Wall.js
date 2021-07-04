import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from './avatar.jpg';
import firebase from 'firebase/app';
import { useFirestoreCollection } from './hooks';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';

function Wall(props) {
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const db = firebase.firestore();
  const history = useHistory();

  const fetchPosts = useFirestoreCollection(
    db.collection('posts').orderBy('date', 'desc'),
    []
  );

  const goToProfile = () => {
    history.push(`/profile`);
  };

  return (
    <View style={styles.postContainer}>
      {fetchPosts.map((post) => {
        return (
          <View key={post.id} style={styles.postSection}>
            <View style={styles.userHeader}>
              <TouchableOpacity onPress={goToProfile}>
                <Image source={Avatar} style={styles.avatarImage} />
              </TouchableOpacity>
              <View style={styles.detailsContainer}>
                <Text style={styles.userName}>Laurence</Text>
                <Text style={styles.date}>{post.data.date.nanoseconds}</Text>
              </View>
            </View>

            <Text style={styles.post}>{post.data.post}</Text>

            <View style={styles.reactionData}>
              <View style={styles.reactionSection}>
                <Text style={styles.reactionText}> 50 likes</Text>
              </View>
              <View style={styles.reactionSection}>
                <Text style={styles.reactionText}> 13 comments</Text>
              </View>
            </View>

            <View style={styles.reactionContainer}>
              <View style={styles.reactionSection}>
                <Feather name='heart' size={25} color='grey' />
                <Text style={styles.reactionText}>Love</Text>
              </View>
              <View style={styles.reactionSection}>
                <Feather name='message-square' size={25} color='grey' />
                <Text style={styles.reactionText}>Comment</Text>
              </View>
            </View>
          </View>
        );
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
