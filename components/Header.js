import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

function Header(props) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.social}>Social</Text>
      <Feather name='bell' size={25} color='black' />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
  },
  social: {
    marginLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2F4858',
  },
});

export { Header };
