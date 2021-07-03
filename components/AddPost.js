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
import Avatar from './avatar.png';

function AddPost({ setModalVisible, modalVisible }) {
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const db = firebase.firestore();
  const [post, setPost] = useState('');

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
      date: new Date(),
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
        <Image source={Avatar} style={styles.avatarImage} />
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
        <View style={styles.toolsSection}>
          <Feather name='camera' size={25} color='black' />
          <Text style={styles.toolText}>Photo</Text>
        </View>
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
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: { color: 'black', fontSize: 18, marginLeft: 10, marginTop: 22 },
  toolsContainer: {
    marginTop: 330,
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
