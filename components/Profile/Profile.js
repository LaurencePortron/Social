import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Image as RNImage } from 'react-native';
import firebase from 'firebase/app';
import { useFirestoreCollection, useFirestoreDocument } from '../hooks';
import Wave from '../Images/wave.jpg';
import { useHistory } from 'react-router-native';
import { Feather } from '@expo/vector-icons';
import { Wall } from '../Wall/Wall';
import { UploadImageModal } from '../AppComponents/UploadImageModal';
import { Footer } from '../Wall/Footer';
import { ProfileButtons } from './ProfileButtons';
import { ProfileInfo } from './ProfileInfo';
import Avatar from '../Images/avatar.png';
import { UploadCoverPicture } from '../AppComponents/UploadCoverPicture';
import { Image } from 'react-native-expo-image-cache';

function Profile(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [coverIsOpen, setCoverisOpen] = useState(false);
  const history = useHistory();
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const profileId = props.match.params.id;
  const db = firebase.firestore();

  const openUpload = () => {
    setIsOpen(!isOpen);
  };

  const openCoverPictureUpload = () => {
    setCoverisOpen(!coverIsOpen);
  };

  const getUserProfileInfo = useFirestoreDocument(
    db.collection('accounts').doc(profileId),
    [profileId]
  );

  // fetch friends of the logged in user
  const fetchFriends = useFirestoreCollection(
    db.collection('accounts').doc(userId).collection('friends'),
    []
  );

  const getFriendIds = fetchFriends.map((friend) => {
    if (friend.data.isFriend === true || friend.data.requestAccepted === true) {
      return friend.id;
    }
  });

  const getPendingFriendIds = fetchFriends.map((friend) => {
    if (
      friend.data.isFriend === false ||
      friend.data.requestAccepted === false
    ) {
      return friend.id;
    }
  });

  const checkIfFriends = getFriendIds.includes(profileId);

  const checkIfRequestPending = getPendingFriendIds.includes(profileId);

  if (!getUserProfileInfo) {
    return null;
  }

  const backToDashboard = () => {
    history.push(`/dashboard`);
  };

  const goToEditProfile = () => {
    history.push(`/editProfile/${userId}`);
  };

  const goToFriends = () => {
    history.push(`/friends/${userId}`);
  };

  const handleFriendRequest = () => {
    db.collection('accounts')
      .doc(userId)
      .collection('friends')
      .doc(profileId)
      .set({
        isFriend: false,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    db.collection('accounts')
      .doc(profileId)
      .collection('friends')
      .doc(userId)
      .set({
        requestAccepted: false,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    db.collection('accounts')
      .doc(profileId)
      .collection('friendsNotifications')
      .doc(userId)
      .set({
        friends: userId,
        isFriend: false,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        markedAsRead: false,
      });
  };

  if (!fetchFriends) {
    return null;
  }

  const pendingIcon = <Feather name='clock' size={24} color='black' />;
  const aboutIcon = <Feather name='user' size={24} color='black' />;
  const editProfileIcon = <Feather name='edit' size={24} color='black' />;
  const myFriendsIcon = <Feather name='users' size={24} color='black' />;
  const friendsIcon = <Feather name='check' size={24} color='black' />;
  const addFriendIcon = <Feather name='user-plus' size={24} color='black' />;

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.headerSection}>
        <TouchableOpacity onPress={backToDashboard}>
          <Feather name='chevron-left' size={40} color='black' />
          {getUserProfileInfo.data.coverPicture ? (
            <Image
              uri={getUserProfileInfo.data.profilePicture}
              style={styles.coverImage}
            />
          ) : (
            <RNImage source={Wave} style={styles.coverImage} />
          )}
        </TouchableOpacity>
        {profileId !== userId ? null : (
          <View style={styles.cameraIconCover}>
            <TouchableOpacity onPress={openCoverPictureUpload}>
              <Feather name='camera' size={35} color='#6CA9D6' />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.profileImageSection}>
          {getUserProfileInfo.data.profilePicture ? (
            <Image
              uri={getUserProfileInfo.data.profilePicture}
              style={styles.profileImage}
            />
          ) : (
            <RNImage source={Avatar} style={styles.profileImage} />
          )}

          {profileId !== userId ? null : (
            <View style={styles.cameraIconContainer}>
              <TouchableOpacity onPress={openUpload}>
                <Feather name='camera' size={35} color='#6CA9D6' />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Text style={styles.userName}>{getUserProfileInfo.data.userName}</Text>
      </View>
      {isOpen ? <UploadImageModal profileId={profileId} /> : null}
      {coverIsOpen ? <UploadCoverPicture profileId={profileId} /> : null}

      {checkIfFriends ? (
        <ProfileButtons
          firstPlaceholder='Friends'
          secondPlaceholder={'About ' + getUserProfileInfo.data.userName}
          firstIcon={friendsIcon}
          secondIcon={aboutIcon}
        />
      ) : checkIfRequestPending ? (
        <ProfileButtons
          firstPlaceholder='Pending'
          secondPlaceholder={'About ' + getUserProfileInfo.data.userName}
          firstIcon={pendingIcon}
          secondIcon={aboutIcon}
        />
      ) : profileId === userId ? (
        <ProfileButtons
          firstPlaceholder='Edit Profile'
          secondPlaceholder='My Friends'
          onPressNavigationFirstButton={goToEditProfile}
          onPressNavigationSecondButton={goToFriends}
          firstIcon={editProfileIcon}
          secondIcon={myFriendsIcon}
        />
      ) : (
        <ProfileButtons
          firstPlaceholder='Add Friend'
          secondPlaceholder={'About ' + getUserProfileInfo.data.userName}
          onPressNavigationFirstButton={handleFriendRequest}
          firstIcon={addFriendIcon}
          secondIcon={aboutIcon}
        />
      )}

      <ProfileInfo
        location={getUserProfileInfo.data.location}
        birthday={getUserProfileInfo.data.birthday}
      />
      <Wall profileId={profileId} />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  coverImage: { width: '100%', height: 200 },
  profileImageSection: {
    position: 'absolute',
    top: 90,
    left: 90,
  },

  profileImage: {
    borderRadius: 300,
    width: 200,
    height: 200,
    borderWidth: 5,
    borderColor: 'white',
  },
  cameraIconCover: {
    bottom: 180,
    left: 310,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 50,
    width: 55,
  },
  cameraIconContainer: {
    bottom: 60,
    left: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 50,
    width: 55,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 50,
  },
  profileOptions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  editProfileButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    padding: 10,
    borderRadius: 10,
    width: 150,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
  },
  addFriendButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6CA9D6',
    padding: 10,
    borderRadius: 10,
    width: 150,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
  },
  editProfilePlaceholder: { marginLeft: 10, fontSize: 18 },
});
export { Profile };
