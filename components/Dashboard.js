import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LogOut } from './LogOut';
import { Header } from './Header';
import { CustomModal } from './CustomModal';
import { Wall } from './Wall';
import { useHistory } from 'react-router-native';
import Avatar from './avatar.png';

function Dashboard(props) {
  const history = useHistory();

  const openProfile = () => {
    history.push(`/profile`);
  };

  const placeholder = (
    <View style={styles.mainSection}>
      <Image source={Avatar} style={styles.avatarImage} />
      <Text style={styles.postText}>Whats on you mind..</Text>
    </View>
  );

  return (
    <ScrollView>
      <Header />
      <CustomModal placeholder={placeholder} />
      <Wall />
      <LogOut />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  postText: { color: '#A8A39F', fontSize: 18 },
});

export { Dashboard };
