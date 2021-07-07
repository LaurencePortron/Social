import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

function FeelingsActivities({
  setModalVisible,
  modalVisible,
  addAFeeling,
  emojiSelected,
  setEmojiSelected,
}) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Feather name='x' size={25} color='black' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chose a feeling</Text>
      </View>
      <View style={styles.feelingsTable}>
        <View style={styles.leftColumns}>
          <TouchableOpacity>
            <Text
              style={styles.emojis}
              onPress={() => {
                addAFeeling('is feeling happy &#128578;');
                setModalVisible(!modalVisible);
              }}
            >
              &#128578; happy
            </Text>
          </TouchableOpacity>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling loved &#128525;');
              setModalVisible(!modalVisible);
            }}
          >
            &#128525; loved
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling sad &#128532;');
              setModalVisible(!modalVisible);
            }}
          >
            &#128532; sad
          </Text>
        </View>
        <View style={styles.rightColumns}>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling excited &#129321;');
              setModalVisible(!modalVisible);
            }}
          >
            &#129321; excited
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling crazy &#129322;');
              setModalVisible(!modalVisible);
            }}
          >
            &#129322; crazy
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling thoughtful &#129488;');
              setModalVisible(!modalVisible);
            }}
          >
            &#129488; thoughtful
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: { width: '100%', backgroundColor: 'white' },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
    padding: 15,
  },
  headerTitle: { fontWeight: 'bold', fontSize: 18 },
  postButton: { fontWeight: 'bold', fontSize: 18, color: '#A8A39F' },
  feelingsTable: {
    display: 'flex',
    flexDirection: 'row',
  },
  emojis: {
    padding: 10,
    fontSize: 30,
    borderWidth: 1,
    borderColor: '#ECE6E0',
  },
});

export { FeelingsActivities };
