import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import 'firebase/storage';

function UploadImageModal({ profileId }) {
  const db = firebase.firestore();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const downloadURL = await uploadImage(result.uri);
      db.collection('accounts').doc(profileId).update({
        profilePicture: downloadURL,
      });
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child(`profilePictures/${profileId}`);
    await ref.put(blob);

    return ref.getDownloadURL();
  };

  return (
    <View>
      <Button title='Upload profile picture' onPress={pickImage} />
    </View>
  );
}

export { UploadImageModal };
