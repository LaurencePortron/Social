import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { TagFriendsList } from './TagFriendsList';

function TagFriendsModal({ placeholder, userId, handleTagFriend }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
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
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TagFriendsList
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                handleTagFriend={handleTagFriend}
                userId={userId}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    width: '100%',
    height: '50%',
    bottom: 0,
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

export { TagFriendsModal };
