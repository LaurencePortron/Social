import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CustomSearchBar } from '../AppComponents/CustomSearchBar';
import firebase from 'firebase/app';
import { useFirestoreCollection } from '../hooks';
import { Notifications } from '../Notifications/Notifications';
import { CommentNotifications } from '../Notifications/CommentNotifications';
import { LikesNotifications } from '../Notifications/LikesNotifications';

function DashboardHeader(props) {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const fetchFriendsNotifications = useFirestoreCollection(
    db
      .collection('accounts')
      .doc(userId)
      .collection('friendsNotifications')
      .orderBy('created', 'desc'),
    []
  );

  const fetchCommentNotifications = useFirestoreCollection(
    db
      .collection('accounts')
      .doc(userId)
      .collection('commentNotifications')
      .orderBy('created', 'desc'),
    []
  );

  const fetchLikesNotifications = useFirestoreCollection(
    db
      .collection('accounts')
      .doc(userId)
      .collection('likesNotifications')
      .orderBy('created', 'desc'),
    []
  );

  console.log(fetchLikesNotifications);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.social}>Social</Text>
      {searchIsOpen ? <CustomSearchBar /> : null}
      <View style={styles.iconSection}>
        <TouchableOpacity onPress={() => setSearchIsOpen(!searchIsOpen)}>
          <Feather name='search' size={25} color='white' style={styles.bell} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setNotificationsOpen(!notificationsOpen)}
        >
          <View style={styles.notificationIconContainer}>
            <View style={styles.iconContainer}>
              <Feather
                name='bell'
                size={25}
                color='white'
                style={styles.bell}
              />
            </View>
            <View style={styles.circle}></View>
          </View>
        </TouchableOpacity>
        {notificationsOpen ? (
          <View style={styles.notificationsOpen}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationHeaderText}>Notifications</Text>
            </View>
            {fetchLikesNotifications.map((likes) => {
              return (
                <LikesNotifications
                  key={likes.id}
                  postId={likes.data.post}
                  created={likes.data.created}
                  friendId={likes.data.userId}
                  placeholder='liked your post'
                  isRead={likes.data.markedAsRead}
                  userId={userId}
                  likeId={likes.id}
                />
              );
            })}

            {fetchCommentNotifications.map((comment) => {
              return (
                <CommentNotifications
                  key={comment.id}
                  postId={comment.data.post}
                  created={comment.data.created}
                  friendId={comment.data.userId}
                  placeholder='commented on your post'
                  isRead={comment.data.markedAsRead}
                  userId={userId}
                  commentId={comment.id}
                />
              );
            })}
            {fetchFriendsNotifications.map((notification) => {
              if (
                notification.data.isFriend === false &&
                userId !== notification.id
              ) {
                return (
                  <View>
                    <Notifications
                      key={userId}
                      friendId={notification.id}
                      created={notification.data.created}
                      userId={userId}
                      placeholder='added you as a friend'
                      isRead={notification.data.markedAsRead}
                    />
                  </View>
                );
              }

              if (notification.data.isFriend === true) {
                return (
                  <Notifications
                    key={notification.id}
                    friendId={notification.id}
                    created={notification.data.created}
                    userId={userId}
                    placeholder='accepted your friend request'
                    isRead={notification.data.markedAsRead}
                  />
                );
              }
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
    backgroundColor: '#6CA9D6',
    zIndex: 1,
  },
  social: {
    marginLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  iconSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 280,
  },
  notificationIconContainer: { marginTop: 15 },
  bell: { marginRight: 20 },
  circle: {
    backgroundColor: '#A2D8EB',
    borderRadius: 50,
    fontWeight: 'bold',
    bottom: 30,
    left: 15,
    width: 10,
    height: 10,
  },

  notificationsOpen: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 40,
    right: 20,
    width: 300,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },

  notificationHeader: {
    backgroundColor: '#A2D8EB',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  notificationHeaderText: { fontSize: 18 },
});

export { DashboardHeader };
