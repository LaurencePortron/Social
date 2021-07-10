import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

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
    justifyContent: 'center',
  },
  editProfileButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A2D8EB',
    padding: 10,
    borderRadius: 10,
    maxWidth: 165,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
  },
  editProfilePlaceholder: { marginLeft: 10, fontSize: 18 },
});

export { ProfileButtons };
