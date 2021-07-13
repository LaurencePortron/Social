import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-native';
import { useFirestoreDocument } from '../hooks';
import { CustomModal } from '../Posts/CustomModal';
import { Feelings } from '../Posts/Feelings';
import { TagFriendsModal } from '../Friends/TagFriendsModal';
import { TaggedFriend } from '../Friends/TaggedFriend';
import { Image } from 'react-native-expo-image-cache';

function AddPost(props) {
  const [post, setPost] = useState('');
  const [feeling, setFeeling] = useState('');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [tagFriend, setTagFriend] = useState('');
  const history = useHistory();

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
      feeling: feeling,
      isWith: tagFriend,
    });

    history.push(`/dashboard`);
  };

  const backToWall = () => {
    history.push(`/dashboard`);
  };

  const feelingplaceholder = (
    <View style={styles.mainSection}>
      <Feather name='smile' size={25} color='black' />
      <Text style={styles.toolText}>Feeling/Activity</Text>
    </View>
  );

  const tagFriendsPlaceholder = (
    <View style={styles.mainSection}>
      <Feather name='tag' size={25} color='black' />
      <Text style={styles.toolText}>Tag Friends</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={backToWall}>
          <Feather name='x' size={25} color='black' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create post</Text>
        <TouchableOpacity onPress={addPostToWall}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.user}>
        <Image
          uri={getCurrentLoggedUser.data.profilePicture}
          style={styles.profileImage}
        />
        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>
            {getCurrentLoggedUser.data.userName}
          </Text>
          <Feelings selectedFeeling={feeling} />

          {tagFriend ? (
            <TaggedFriend friendId={tagFriend} userId={userId} />
          ) : null}
        </View>
      </View>

      <TextInput
        style={styles.textInput}
        name='post'
        placeholder='Whats on your mind?'
        placeholderTextColor='#A8A39F'
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
        <CustomModal
          placeholder={feelingplaceholder}
          addAFeeling={(emoji) => setFeeling(emoji)}
        />
        <TouchableOpacity>
          <TagFriendsModal
            placeholder={tagFriendsPlaceholder}
            userId={userId}
            handleTagFriend={(friend) => setTagFriend(friend)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { width: '100%', backgroundColor: 'white', marginTop: 20 },
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
  userNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: { fontSize: 20, fontWeight: 'bold', marginLeft: 3 },
  emojis: { marginLeft: 5, fontSize: 18 },
  profileImage: { width: 40, height: 40, borderRadius: 50 },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  textInput: { color: 'black', fontSize: 18, marginLeft: 20, marginTop: 22 },
  toolsContainer: {
    marginTop: 280,
    bottom: 0,
    backgroundColor: '#E8E8E8',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  toolsSection: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  toolText: { marginLeft: 10, fontSize: 18, padding: 10 },
  mainSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  postText: { color: '#A8A39F', fontSize: 18 },
});

export { AddPost };
