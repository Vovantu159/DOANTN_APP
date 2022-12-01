import React, {Component} from 'react';
import {Platform} from 'react-native';
import storage from '@react-native-firebase/storage';
import {BaseURL} from '../../../constants/ApiConnection';
const upLoadImage = async (image, phoneNumber) => {
  let uploadUri =
    Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path;
  let fileName = 'avatar';
  const storageRef = storage().ref(`Customer/${phoneNumber}/${fileName}`);
  const task = storageRef.putFile(uploadUri);
  // Set transferred state
  task.on('state_changed', (taskSnapshot) => {
    // console.log(
    //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    // );
    // console.log(
    //   Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
    //     100,
    // );
  });
  try {
    await task;
    const url = await storageRef.getDownloadURL();
    console.log('url', url);

    return url;
  } catch (e) {
    return null;
  }
};
const updateAvatar = async (token, url) => {
  try {
    let response = await fetch(BaseURL + '/profile/avatar', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        avatar: url,
      }),
    });
    let responseJson = await response.json();
    return {
      status: response.status,
      resJson: responseJson,
    };
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
};
export {upLoadImage, updateAvatar};
