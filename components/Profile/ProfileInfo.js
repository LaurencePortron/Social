import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

function ProfileInfo({ location, birthday }) {
  return (
    <View style={styles.profileInfoContainer}>
      <View style={styles.profileInfoSection}>
        <Feather name='map-pin' size={24} color='#6CA9D6' />
        <Text style={styles.infoPlaceholder}>Lives in</Text>
        <Text style={styles.infoPlaceholderData}> {location}</Text>
      </View>
      <View style={styles.profileInfoSection}>
        <Feather name='clock' size={24} color='#6CA9D6' />
        <Text style={styles.infoPlaceholder}>Joined </Text>
        <Text style={styles.infoPlaceholderData}> 4th July </Text>
      </View>
      <View style={styles.profileInfoSection}>
        <Feather name='gift' size={24} color='#6CA9D6' />
        <Text style={styles.infoPlaceholder}>Birthday</Text>
        <Text style={styles.infoPlaceholderData}> {birthday}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export { ProfileInfo };
