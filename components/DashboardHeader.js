import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CustomSearchBar } from './CustomSearchBar';
import firebase from 'firebase/app';
import { useFirestoreCollection } from './hooks';
import { useHistory } from 'react-router-native';

function DashboardHeader(props) {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const history = useHistory();

  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const seeFriends = useFirestoreCollection(
    db.collection('accounts').doc(userId).collection('friends'),
    []
  );

  const friendRequestId = seeFriends.map((friend) => {
    if (friend.data.requestAccepted === false) {
      return friend.id;
    }
  });

  console.log(seeFriends);

  const goToFriendRequests = () => {
    history.push(`/friendRequests/${userId}`);
  };

  const notif = (
    <TouchableOpacity onPress={goToFriendRequests}>
      <View style={styles.newNotif}>
        <Text style={styles.userName}>Username</Text>
        <Text>would like to add you as a friend</Text>
        <View style={styles.circle}></View>
      </View>
    </TouchableOpacity>
  );

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
          <Feather name='bell' size={25} color='white' style={styles.bell} />
        </TouchableOpacity>
        {notificationsOpen ? (
          <View style={styles.notificationsOpen}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationHeaderText}>Notifications</Text>
            </View>
            <View style={styles.notificationBody}>
              <TouchableOpacity onPress={goToFriendRequests}>
                <View style={styles.newNotif}>
                  <Text style={styles.userName}>Username</Text>
                  <Text>would like to add you as a friend</Text>
                  <View style={styles.circle}></View>
                </View>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.notificationBody}>
              <TouchableOpacity onPress={goToFriendRequests}>
                <View style={styles.newNotif}>
                  <Text style={styles.userName}>{getUserName}</Text>
                  <Text>would like to add you as a friend</Text>
                  <View style={styles.circle}></View>
                </View>
              </TouchableOpacity>
            </View> */}
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
  bell: { marginRight: 20 },
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
  notificationBody: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  userName: { fontWeight: 'bold', marginRight: 5 },
  newNotif: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  circle: {
    backgroundColor: '#A2D8EB',
    width: 7,
    height: 7,
    borderRadius: 50,
    marginLeft: 10,
  },
});

export { DashboardHeader };
