import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Avatar from './avatar.png';
import { AddPost } from './AddPost';
import { Feather } from '@expo/vector-icons';

function AddPostModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.mainSection}>
          <Image source={Avatar} style={styles.avatarImage} />
          <Text style={styles.postText}>What's on your mind...</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.centeredView}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AddPost
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
    marginTop: 20,
  },
  mainSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  postText: { color: '#A8A39F', fontSize: 18 },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: '100%',
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
});

export { AddPostModal };
