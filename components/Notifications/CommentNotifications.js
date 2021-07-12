import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFirestoreDocument } from '../hooks';
import firebase from 'firebase/app';
import moment from 'moment';
import { useHistory } from 'react-router-native';

function CommentNotifications({
  friendId,
  placeholder,
  created,
  isRead,
  postId,
  userId,
  commentId,
}) {
  const history = useHistory();
  const db = firebase.firestore();

  const goToPost = () => {
    history.push(`/post/${postId}`);
  };

  const getFriendInfo = useFirestoreDocument(
    db.collection('accounts').doc(friendId),
    []
  );

  if (!getFriendInfo) {
    return null;
  }

  const markAsRead = () => {
    db.collection('accounts')
      .doc(userId)
      .collection('commentNotifications')
      .doc(commentId)
      .update({
        markedAsRead: true,
      });
  };

  return (
    <View
      style={[
        styles.notificationBody,
        isRead === true ? styles.notificationBodyMarkedAsRead : null,
      ]}
      key={commentId}
    >
      <TouchableOpacity onPress={() => goToPost(postId)}>
        <View style={styles.newNotif}>
          <Text style={styles.userName}>{getFriendInfo.data.userName}</Text>
          <Text>{placeholder}</Text>
        </View>
        <Text style={styles.date}>
          {moment(created.toDate()).format('MMM Do')}
        </Text>
        {isRead === true ? null : (
          <TouchableOpacity onPress={markAsRead}>
            <Text>Mark as read</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationBody: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#D8D9DD',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  notificationBodyMarkedAsRead: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  newNotif: { display: 'flex', flexDirection: 'row', alignItems: 'center' },

  userName: { fontWeight: 'bold', marginRight: 5 },

  markAsRead: { textDecorationLine: 'underline', marginTop: 10, fontSize: 15 },
});

export { CommentNotifications };
