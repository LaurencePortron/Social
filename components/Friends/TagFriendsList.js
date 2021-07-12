import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import { useFirestoreCollection } from '../hooks';
import { Feather } from '@expo/vector-icons';
import { Friend } from './Friend';

function TagFriendsList({
  setModalVisible,
  modalVisible,
  userId,
  handleTagFriend,
}) {
  const db = firebase.firestore();

  const fetchFriendsToTag = useFirestoreCollection(
    db.collection('accounts').doc(userId).collection('friends'),
    []
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Feather name='x' size={25} color='black' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tag Friends</Text>
      </View>
      <View style={styles.feelingsTable}>
        {fetchFriendsToTag.map((friend) => {
          const friendId = friend.id;
          return (
            <TouchableOpacity
              onPress={() => {
                handleTagFriend(friendId);
                setModalVisible(!modalVisible);
              }}
            >
              <Friend friendId={friend.id} friendsSince={friend.data.created} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
    padding: 15,
  },
  headerTitle: { fontWeight: 'bold', fontSize: 18 },
  feelingsTable: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export { TagFriendsList };
