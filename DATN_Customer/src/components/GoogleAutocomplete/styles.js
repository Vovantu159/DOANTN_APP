import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
export const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: colors.white_background,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    height: verticalScale(46),
    alignItems: 'center',
    borderRadius: 4,
  },
  textInput: {
    flex: 1,
    height: verticalScale(46),
    backgroundColor: colors.white_background,
    color: '#000',
    fontSize: 16,
    marginTop: 0,
  },
  row: {backgroundColor: colors.white_background},
  listView: {
    display: 'flex',
    top: 0,
    maxHeight: verticalScale(100),
  },
});
