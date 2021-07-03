import React from 'react';
import { Text, View } from 'react-native';
import { LogOut } from './LogOut';

function Dashboard(props) {
  return (
    <View>
      <Text>Welcome!</Text>
      <LogOut />
    </View>
  );
}

export { Dashboard };
