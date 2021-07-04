import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import algoliasearch from 'algoliasearch/lite';
import { useHistory } from 'react-router-native';

const client = algoliasearch('CJQI1GSDF6', '23df10b43136c09b11a1e4979d7972a5');
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

  console.log(getUserIdOfSearch);
  // console.log(Object.values(getUserIdOfSearch));

  const openProfile = (getUserIdOfSearch) => {
    history.push(`/profile/${getUserIdOfSearch}`);
  };

  return (
    <View>
      <View style={styles.toolsSection}>
        <TextInput
          style={styles.searchInput}
          name='text'
          placeholder='Search Social..'
          placeholderTextColor='#A8A39F'
          onChangeText={handleSearchInput}
        ></TextInput>
      </View>
      <View style={styles.resultList}>
        <TouchableOpacity onPress={() => openProfile(getUserIdOfSearch)}>
          <Text>{resultArray}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolsSection: {
    backgroundColor: 'white',
    width: 250,
    right: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    right: 90,
    top: 10,
  },
  searchInput: { padding: 10 },
  resultList: {
    backgroundColor: 'grey',
    top: 10,
    right: 90,
    color: 'green',
  },
});

export { CustomSearchBar };
