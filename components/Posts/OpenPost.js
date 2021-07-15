import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useFirestoreDocument, useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';
import { Comments } from './Comments';
import { PageHeaders } from '../AppComponents/PageHeaders';
import { Post } from './Post';

function OpenPost(props) {
  const [comment, setComment] = useState('');
  const postId = props.match.params.id;
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const history = useHistory();

  const fetchPost = useFirestoreDocument(db.collection('posts').doc(postId), [
    postId,
  ]);

  const fetchComments = useFirestoreCollection(
    db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('created', 'asc'),
    [postId]
  );

  if (!fetchPost) {
    return null;
  }

  const userIdOfPost = fetchPost.data.userId;

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
    db.collection('accounts')
      .doc(userIdOfPost)
      .collection('commentNotifications')
      .add({
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        comment: comment,
        userId: userId,
        post: postId,
        markAsRead: false,
      });
  };

  const backToDashboard = () => {
    history.push(`/dashboard`);
  };

  return (
    <ScrollView>
      <View style={styles.postContainer}>
        <PageHeaders
          placeholder='Back to Wall'
          onPressNavigation={backToDashboard}
        />
        <View style={{ marginTop: 10, marginLeft: 10 }}>
          <Post post={fetchPost.data} isWith={fetchPost.data.isWith} />
        </View>

        {fetchComments.map((comment) => {
          return <Comments key={comment.id} comment={comment.data} />;
        })}
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
