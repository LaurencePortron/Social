import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/app';
import { useFirestoreDocument } from './hooks';
import { UploadImageModal } from './UploadImageModal';

function AddPost({ setModalVisible, modalVisible }) {
  const [post, setPost] = useState('');
  const [uploadOpen, setUploadOpen] = useState(false);

  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const db = firebase.firestore();

  const handlePost = (inputText) => {
    setPost(inputText);
  };

  const getCurrentLoggedUser = useFirestoreDocument(
    firebase.firestore().collection('accounts').doc(userId),
    [userId]
  );

  if (!getCurrentLoggedUser) {
    return null;
  }

  const addPostToWall = () => {
    db.collection('posts').add({
      post: post,
      userId: userId,
      created: firebase.firestore.Timestamp.fromDate(new Date()),
    });
    setModalVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Feather name='x' size={25} color='black' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create post</Text>
        <TouchableOpacity onPress={addPostToWall}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.user}>
        <Image
          source={{ uri: getCurrentLoggedUser.data.profilePicture }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>
          {getCurrentLoggedUser.data.userName}
        </Text>
      </View>
      <TextInput
        style={styles.textInput}
        textContentType='emailAddress'
        name='email'
        placeholder='Whats on your mind?'
        placeholderTextColor='#A8A39F'
        required
        inputText={post}
        onChangeText={handlePost}
      />
      <View style={styles.toolsContainer}>
        <TouchableOpacity onPress={() => setUploadOpen(!uploadOpen)}>
          <View style={styles.toolsSection}>
            <Feather name='camera' size={25} color='black' />
            <Text style={styles.toolText}>Photo</Text>
          </View>
        </TouchableOpacity>
        {uploadOpen ? <UploadImageModal postId={postId} /> : null}

        <View style={styles.toolsSection}>
          <Feather name='tag' size={25} color='black' />
          <Text style={styles.toolText}>Tag people</Text>
        </View>
        <View style={styles.toolsSection}>
          <Feather name='smile' size={25} color='black' />
          <Text style={styles.toolText}>Feeling/Activity</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { width: '100%' },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
    padding: 15,
  },
  headerTitle: { fontWeight: 'bold', fontSize: 18 },
  postButton: { fontWeight: 'bold', fontSize: 18, color: '#A8A39F' },
  userName: { fontSize: 18, fontWeight: 'bold' },
  // profileImage:{width:300},
  user: {
    display: 'flex',
    flexDirection: 'row',
  },
  textInput: { color: 'black', fontSize: 18, marginLeft: 10, marginTop: 22 },
  toolsContainer: {
    marginTop: 270,
    bottom: 0,
    backgroundColor: '#E8E8E8',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  toolsSection: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  toolText: { marginLeft: 10, fontSize: 18, padding: 10 },
});

export { AddPost };
