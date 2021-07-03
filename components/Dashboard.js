import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { LogOut } from './LogOut';
import { Header } from './Header';
import { AddPostModal } from './AddPostModal';
import Avatar from './avatar.png';
import firebase from 'firebase/app';
import { useFirestoreCollection } from './hooks';
import { Feather } from '@expo/vector-icons';

function Dashboard(props) {
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const db = firebase.firestore();

  const fetchPosts = useFirestoreCollection(
    db.collection('posts').orderBy('date', 'asc'),
    []
  );

  console.log(fetchPosts);

  return (
    <ScrollView>
      <Header />
      <AddPostModal />
      <View style={styles.postContainer}>
        <View>
          {fetchPosts.map((post) => {
            return (
              <View style={styles.postSection}>
                <View style={styles.userHeader}>
                  <Image source={Avatar} style={styles.avatarImage} />
                  <View style={styles.detailsContainer}>
                    <Text style={styles.userName}>Laurence</Text>
                    <Text style={styles.date}>
                      {post.data.date.nanoseconds}
                    </Text>
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
                    <Feather name='thumbs-up' size={25} color='grey' />
                    <Text style={styles.reactionText}>Like</Text>
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
      </View>

      <LogOut />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginTop: 20,
    backgroundColor: '#ECE6E0',
  },
  postSection: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
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

export { Dashboard };
