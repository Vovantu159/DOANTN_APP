import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import images from '../../../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../theme/colors';
import PropTypes from 'prop-types';

export default function Header(props) {
  const {title, content, navigation} = props;
  return (
    <ImageBackground
      style={{
        width: scale(375),
        height: verticalScale(180),
      }}
      source={images.authenHeader}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <AntDesign
          name="left"
          size={24}
          style={{
            marginLeft: scale(16),
            marginTop: verticalScale(40),
          }}
          color={colors.white_background}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.txtTitle}>{title}</Text>
        <Text numberOfLines={3} style={styles.textContent}>
          {content}
        </Text>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  content: {marginHorizontal: 40},
  txtTitle: {
    color: colors.white_background,
    marginTop: verticalScale(5),
    fontSize: verticalScale(18),
    fontWeight: '600',
  },
  textContent: {
    color: colors.white_background,
    marginTop: verticalScale(10),
    fontSize: verticalScale(14),
  },
});

Header.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};
Header.defaultProps = {
  title: 'Title',
  content: 'Content',
};
