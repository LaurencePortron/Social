import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CustomSearchBar } from './CustomSearchBar';

function Header(props) {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.social}>Social</Text>
      {searchIsOpen ? <CustomSearchBar /> : null}
      <View style={styles.iconSection}>
        <TouchableOpacity onPress={() => setSearchIsOpen(!searchIsOpen)}>
          <Feather name='search' size={25} color='black' style={styles.bell} />
        </TouchableOpacity>
        <Feather name='bell' size={25} color='black' style={styles.bell} />
      </View>
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
    backgroundColor: 'white',
  },
  social: {
    marginLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2F4858',
  },
  iconSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bell: { marginRight: 20 },
});

export { Header };
