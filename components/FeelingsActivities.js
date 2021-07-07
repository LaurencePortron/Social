import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

function FeelingsActivities({ setModalVisible, modalVisible }) {
  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <Feather name='x' size={25} color='black' />
      </TouchableOpacity>
      <Text>Chose a feeling</Text>
    </View>
  );
}
const styles = StyleSheet.create({});

export { FeelingsActivities };
