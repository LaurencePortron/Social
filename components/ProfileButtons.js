import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

function ProfileButtons({
  onPressNavigationSecondButton,
  onPressNavigationFirstButton,
  firstPlaceholder,
  secondPlaceholder,
  firstIcon,
  secondIcon,
}) {
  return (
    <View style={styles.profileOptions}>
      <TouchableOpacity onPress={onPressNavigationFirstButton}>
        <View style={styles.editProfileButton}>
          {firstIcon}
          <Text style={styles.editProfilePlaceholder}>{firstPlaceholder}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressNavigationSecondButton}>
        <View style={styles.editProfileButton}>
          {secondIcon}
          <Text style={styles.editProfilePlaceholder}>{secondPlaceholder}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileOptions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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

export { ProfileButtons };
