import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { AddPost } from './AddPost';
import { Feather } from '@expo/vector-icons';
import { EditProfile } from './EditProfile';

function CustomModal({ placeholder }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        {placeholder}
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
    height: 80,
    marginTop: 10,
    backgroundColor: 'white',
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
  editProfilePlaceholder: { marginLeft: 10, fontSize: 18 },
});

export { CustomModal };
