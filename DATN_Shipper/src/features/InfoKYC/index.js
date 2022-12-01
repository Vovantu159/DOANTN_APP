import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {Header} from '../../components';
import {colors} from '../../theme/colors';
import {Back} from '../../assets/svg/Svg';
import {goBack} from '../../navigation/navigationService';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
const renderLeft = () => <Back />;

export default function InfoKYC() {
  const profile = useSelector(
    (state) => state.auth.currentUser.profile.profile,
  );
  return (
    <View style={styles.container}>
      <Header
        title="Thông tin đăng kí"
        renderLeft={renderLeft}
        onPressLeft={goBack}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>1. Chứng mình nhân dân:</Text>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.img}
          source={{uri: profile?.cmnd_front_url}}
        />
        <Text style={styles.title}>2. Bảo hiểm xe:</Text>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.img}
          source={{uri: profile?.baohiem_url}}
        />
        <Text style={styles.title}>3. Đăng kí xe:</Text>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.img}
          source={{uri: profile?.dangky_xe_url}}
        />
        <Text style={styles.title}>4. Giấy phép lái xe:</Text>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.img}
          source={{uri: profile?.gplx_front_url}}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  img: {
    width: '95%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 5,
  },
});
