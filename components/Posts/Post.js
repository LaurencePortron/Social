import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import moment from 'moment';
import { Feelings } from './Feelings';
import { useFirestoreDocument } from '../hooks';
import firebase from 'firebase/app';
import Avatar from '../Images/avatar.png';
import { TaggedFriend } from '../Friends/TaggedFriend';

function Post({ idOfUser, selectedFeeling, postCreated, postContent, isWith }) {
  const db = firebase.firestore();
  const history = useHistory();

  const goToProfile = (id) => {
    history.push(`/profile/${id}`);
  };

  const goToTaggedUserProfile = (isWith) => {
    history.push(`/profile/${isWith}`);
  };

  const fetchUser = useFirestoreDocument(
    db.collection('accounts').doc(idOfUser),
    []
  );

  const fetchTaggedFriend = useFirestoreDocument(
    db.collection('accounts').doc(isWith),
    []
  );

  if (!fetchUser) {
    return null;
  }

  if (!fetchTaggedFriend) {
    return null;
  }

  return (
    <View>
      <View style={styles.userHeader}>
        {fetchUser.data.profilePicture ? (
          <TouchableOpacity onPress={() => goToProfile(idOfUser)}>
            <Image
              source={{ uri: fetchUser.data.profilePicture }}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
        ) : (
          <Image source={Avatar} style={styles.avatarImage} />
        )}

        <View style={styles.detailsContainer}>
          <View style={styles.userfeelings}>
            <Text style={styles.userName}>{fetchUser.data.userName}</Text>
            <Feelings selectedFeeling={selectedFeeling} />
          </View>
          {fetchTaggedFriend === undefined || isWith === undefined ? null : (
            <View style={styles.isWithContainer}>
              <Text style={styles.isWith}>with</Text>
              <TouchableOpacity onPress={() => goToTaggedUserProfile(isWith)}>
                <Text style={styles.isWithUserName}>
                  {fetchTaggedFriend.data.userName}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.date}>
            {moment(postCreated.toDate()).format('MMM Do')}
          </Text>
        </View>
      </View>
      <Text style={styles.post}>{postContent}</Text>
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
});

export { Post };
