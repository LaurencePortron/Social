import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Feelings({ selectedFeeling }) {
  return (
    <View>
      {selectedFeeling === 'is feeling happy &#128578;' ? (
        <Text style={styles.emojis}> is feeling happy &#128578;</Text>
      ) : null}
      {selectedFeeling === 'is feeling loved &#128525;' ? (
        <Text style={styles.emojis}> is feeling loved &#128525;</Text>
      ) : null}

      {selectedFeeling === 'is feeling sad &#128532;' ? (
        <Text style={styles.emojis}> is feeling loved &#128532;</Text>
      ) : null}

      {selectedFeeling === 'is feeling excited &#129321;' ? (
        <Text style={styles.emojis}> is feeling excited &#129321;</Text>
      ) : null}

      {selectedFeeling === 'is feeling crazy &#129322;' ? (
        <Text style={styles.emojis}> is feeling crazy &#129322;</Text>
      ) : null}

      {selectedFeeling === 'is feeling thoughtful &#129488;' ? (
        <Text style={styles.emojis}> is feeling thoughtful &#129488;</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({ emojis: { fontSize: 18 } });

export { Feelings };
