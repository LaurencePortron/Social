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
import { AddPostModal } from './AddPostModal';
import { Wall } from './Wall';
import { useHistory } from 'react-router-native';

function Dashboard(props) {
  const history = useHistory();

  const openProfile = () => {
    history.push(`/profile`);
  };

  return (
    <ScrollView>
      <Header />
      <AddPostModal />
      <Wall />
      <LogOut />
    </ScrollView>
  );
}

export { Dashboard };
