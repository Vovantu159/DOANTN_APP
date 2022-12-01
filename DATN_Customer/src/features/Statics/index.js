import React, {Component} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {goBack} from '../../navigation/navigationService';
export default function Statics({props, navigation}) {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={goBack}>
        <Text> Thong ke</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
