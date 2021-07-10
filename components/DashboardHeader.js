import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CustomSearchBar } from './CustomSearchBar';
import firebase from 'firebase/app';
import { useFirestoreCollection } from './hooks';
import { useHistory } from 'react-router-native';
import moment from 'moment';
import { Notifications } from './Notifications';

function DashboardHeader(props) {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const history = useHistory();

  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const fetchNotifications = useFirestoreCollection(
    db.collection('accounts').doc(userId).collection('notifications'),
    []
  );

  console.log(fetchNotifications.length);

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
            <Text style={styles.notifNumber}>{fetchNotifications.length}</Text>
          </View>
        </TouchableOpacity>
        {notificationsOpen ? (
          <View style={styles.notificationsOpen}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationHeaderText}>Notifications</Text>
            </View>
            {fetchNotifications.map((notification) => {
              if (
                notification.data.isFriend === false &&
                userId !== notification.id
              ) {
                return (
                  <Notifications
                    friendId={notification.id}
                    created={notification.data.created}
                    userId={userId}
                    placeholder='Added you as a friend'
                    isRead={notification.data.markedAsRead}
                  />
                );
              }
              if (notification.data.isFriend === true) {
                return (
                  <Notifications
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
  },
  notificationIconContainer: { marginTop: 25 },
  bell: { marginRight: 20 },
  notifNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    bottom: 35,
    left: 15,
    color: '#A2D8EB',
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
