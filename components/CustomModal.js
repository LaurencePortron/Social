import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { FeelingsActivities } from './FeelingsActivities';

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
              <FeelingsActivities
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

export { CustomModal };
