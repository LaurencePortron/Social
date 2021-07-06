import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useFirestoreDocument, useFirestoreCollection } from './hooks';
import firebase from 'firebase/app';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';
import { Comments } from './Comments';
import Avatar from './avatar.png';
import moment from 'moment';

function OpenPost(props) {
  const [comment, setComment] = useState('');
  const postId = props.match.params.id;
  const profileId = props.match.params.profileId;
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const history = useHistory();

  const fetchPost = useFirestoreDocument(db.collection('posts').doc(postId), [
    postId,
  ]);

  // const fetchComments = useFirestoreCollection(
  //   db.collection('posts').doc(postId).collection('comments')[postId]
  // );

  // if (!fetchComments) {
  //   return null;
  // }

  console.log(fetchPost);

  if (!fetchPost) {
    return null;
  }

  const handleCommentInput = (inputText) => {
    setComment(inputText);
  };

  const addCommentToPost = () => {
    db.collection('posts')
      .doc(postId)
      .collection('comments')
      .add({
        postComment: comment,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        user: userId,
      });
    setComment('');
  };

  const backToDashboard = () => {
    history.push(`/dashboard`);
  };

  return (
    <ScrollView>
      <View style={styles.postContainer}>
        <TouchableOpacity onPress={backToDashboard}>
          <View style={styles.postHeader}>
            <Feather name='chevron-left' size={35} color='black' />
            <Text style={styles.postHeaderText}>Back to Wall</Text>
          </View>
        </TouchableOpacity>

        <View key={fetchPost.id} style={styles.postSection}>
          <View style={styles.userHeader}>
            <TouchableOpacity onPress={() => goToProfile(userId)}>
              <Image source={Avatar} style={styles.avatarImage} />
            </TouchableOpacity>
            <View style={styles.detailsContainer}>
              <Text style={styles.userName}>{userId}</Text>
              <Text style={styles.date}>
                {moment(fetchPost.data.created.toDate()).format('MMM Do')}
              </Text>
            </View>
          </View>

          <Text style={styles.post}>{fetchPost.data.post}</Text>

          <View style={styles.reactionContainer}>
            <TouchableOpacity onPress={() => addLikesToDb(fetchPost.id)}>
              {fetchPost.data.isLiked ? (
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
            <TouchableOpacity>
              <View style={styles.reactionSection}>
                <Feather name='message-square' size={25} color='grey' />
                <Text style={styles.reactionText}>Comment</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.reactionData}>
          <View style={styles.reactionSection}>
            {fetchPost.data.isLiked ? (
              <Text style={styles.reactionText}>1 love</Text>
            ) : (
              <Text style={styles.reactionText}>0 love</Text>
            )}
          </View>
          <TouchableOpacity>
            <View style={styles.reactionSection}>
              <Text style={styles.reactionText}>2 comments</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Comments postId={postId} />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TextInput
          style={styles.textInput}
          name='email'
          placeholder='Add Comment'
          placeholderTextColor='grey'
          onChangeText={handleCommentInput}
          inputText={comment}
        />
        <TouchableOpacity onPress={addCommentToPost}>
          <Feather name='send' size={25} color='grey' />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: 'white',
  },
  postHeader: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  postHeaderText: { fontSize: 25, fontWeight: 'bold' },
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
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginTop: 20,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    width: 300,
  },
});

export { OpenPost };
