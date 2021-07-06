import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase/app';
import { useFirestoreDocument } from './hooks';
import Wave from './wave.jpg';
import { useHistory } from 'react-router-native';
import { Feather } from '@expo/vector-icons';
import { Wall } from './Wall';
import { UploadImageModal } from './UploadImageModal';

function Profile(props) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const profileId = props.match.params.id;
  const db = firebase.firestore();

  const openUpload = () => {
    setIsOpen(!isOpen);
  };

  const getUserProfileInfo = useFirestoreDocument(
    db.collection('accounts').doc(profileId),
    [profileId]
  );

  if (!getUserProfileInfo) {
    return null;
  }

  const backToDashboard = () => {
    history.push(`/dashboard`);
  };

  const goToEditProfile = () => {
    history.push(`/editProfile/${userId}`);
  };
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.headerSection}>
        <TouchableOpacity onPress={backToDashboard}>
          <View style={styles.profileHeader}>
            <Feather name='chevron-left' size={40} color='black' />
          </View>
        </TouchableOpacity>
        <Image source={Wave} style={styles.coverImage} />
        <View style={styles.cameraIconCover}>
          <TouchableOpacity onPress={openUpload}>
            <Feather name='camera' size={35} color='black' />
          </TouchableOpacity>
        </View>
        <View style={styles.profileImageSection}>
          <Image
            source={{ uri: getUserProfileInfo.data.profilePicture }}
            style={styles.profileImage}
          />
          {profileId !== userId ? null : (
            <View style={styles.cameraIconContainer}>
              <TouchableOpacity onPress={openUpload}>
                <Feather name='camera' size={35} color='black' />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Text style={styles.userName}>{getUserProfileInfo.data.userName}</Text>
      </View>
      {isOpen ? <UploadImageModal profileId={profileId} /> : null}

      {profileId !== userId ? (
        <View style={styles.profileOptions}>
          <TouchableOpacity>
            <View style={styles.addFriendButton}>
              <Feather name='user-plus' size={24} color='black' />
              <Text style={styles.editProfilePlaceholder}>Add Friend</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.editProfileButton}>
              <Feather name='info' size={24} color='black' />
              <Text style={styles.editProfilePlaceholder}>About Samy</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.profileOptions}>
          <TouchableOpacity onPress={() => goToEditProfile(userId)}>
            <View style={styles.editProfileButton}>
              <Feather name='edit' size={24} color='black' />
              <Text style={styles.editProfilePlaceholder}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.editProfileButton}>
              <Feather name='settings' size={24} color='black' />
              <Text style={styles.editProfilePlaceholder}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.profileInfoContainer}>
        <View style={styles.profileInfoSection}>
          <Feather name='map-pin' size={24} color='black' />
          <Text style={styles.infoPlaceholder}>Lives in</Text>
          <Text style={styles.infoPlaceholderData}>
            {' '}
            {getUserProfileInfo.data.location}
          </Text>
        </View>
        <View style={styles.profileInfoSection}>
          <Feather name='clock' size={24} color='black' />
          <Text style={styles.infoPlaceholder}>Joined </Text>
          <Text style={styles.infoPlaceholderData}> 4th July </Text>
        </View>
        <View style={styles.profileInfoSection}>
          <Feather name='gift' size={24} color='black' />
          <Text style={styles.infoPlaceholder}>Birthday</Text>
          <Text style={styles.infoPlaceholderData}>
            {' '}
            {getUserProfileInfo.data.birthday}
          </Text>
        </View>
      </View>
      <Wall profileId={profileId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerSection: { marginBottom: 100 },
  profileHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  coverImage: { width: '100%', height: 150 },
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
    top: 100,
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
  profileInfoContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
  },

  profileInfoSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20,
  },
  infoPlaceholder: { marginLeft: 10, fontSize: 16, fontWeight: 'bold' },
  infoPlaceholderData: { fontSize: 16 },
});
export { Profile };
