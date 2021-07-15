import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import algoliasearch from 'algoliasearch/lite';
import { useHistory } from 'react-router-native';

const client = algoliasearch('CJQI1GSDF6', 'cabdd688557ba08d0aea0ec15fb2d5bb');
const index = client.initIndex('accounts');

function CustomSearchBar(props) {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInput = (inputText) => {
    setSearchInput(inputText);
  };

  useEffect(() => {
    if (searchInput) {
      index.search(searchInput).then((results) => {
        setSearchResults(results.hits);
      });
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);

  const resultArray = searchResults.map((data) => {
    return data.account;
  });

  const getUserIdOfSearch = searchResults.map((data) => {
    return data.objectID;
  });

  const openProfile = (getUserIdOfSearch) => {
    history.push(`/profile/${getUserIdOfSearch}`);
  };

  return (
    <View style={styles.toolsSection}>
      <TextInput
        style={styles.searchInput}
        name='text'
        placeholder='Search Friends..'
        placeholderTextColor='#A8A39F'
        onChangeText={handleSearchInput}
      ></TextInput>
      <TouchableOpacity onPress={() => openProfile(getUserIdOfSearch)}>
        <Text style={styles.searchInput}>{resultArray}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toolsSection: {
    backgroundColor: 'white',
    width: 300,
    right: 20,
    borderRadius: 5,
    right: 90,
    top: 70,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  searchInput: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#6CA9D6',
  },
  resultList: {
    backgroundColor: 'white',
    top: 10,
    right: 90,
    padding: 10,
  },
});

export { CustomSearchBar };
