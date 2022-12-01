/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {styles} from './styles';
import {Header} from '../../components';
import {
  Drawer,
  RightArrow,
  StCar,
  St1Register,
  StLanguage,
  StArticle,
  StContact,
  StStar,
} from '../../assets/svg/Svg';
import images from '../../assets/images';
import {useSelector} from 'react-redux';
import {navigate} from '../../navigation/navigationService';
export default function Setting({props, navigation}) {
  const profile = useSelector((state) => state.auth.currentUser.profile);

  const openDrawer = () => {
    navigation.goBack();
  };
  const renderLeft = () => {
    return <Drawer />;
  };

  return (
    <View style={styles.container}>
      <Header
        title="Thiết lập"
        renderLeft={renderLeft}
        onPressLeft={openDrawer}
      />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.topItem}
          onPress={() => {
            navigation.navigate('Info');
          }}>
          <Image
            style={styles.avt}
            defaultSource={images.avatar}
            source={{uri: profile.avatar}}
          />
          <View style={{marginLeft: 20}}>
            <Text style={styles.txt1}>{profile.name}</Text>
            <Text style={styles.txt2}>Gold member</Text>
          </View>
          <View pointerEvents="none" style={styles.rightIcon}>
            <RightArrow />
          </View>
        </TouchableOpacity>
        {/* Center */}
        <ScrollView style={{flex: 1}}>
          {/* <TouchableOpacity style={styles.bodyItem} onPress={() => {}}>
            <View pointerEvents="none" style={styles.icon}>
              <StCar />
            </View>
            <Text style={{marginLeft: 20}}>Thông tin phương tiện</Text>
            <View pointerEvents="none" style={styles.rightIcon}>
              <RightArrow />
            </View>
          </TouchableOpacity> */}
          {/* --- */}
          <TouchableOpacity
            style={styles.bodyItem}
            onPress={() => navigate('InfoKYC')}>
            <View
              pointerEvents="none"
              style={[styles.icon, {backgroundColor: '#4CD964'}]}>
              <St1Register />
            </View>
            <Text style={{marginLeft: 20}}>Quản lý thông tin đăng kí</Text>
            <View pointerEvents="none" style={styles.rightIcon}>
              <RightArrow />
            </View>
          </TouchableOpacity>
          {/* --- */}
          <TouchableOpacity style={styles.bodyItem} onPress={() => {}}>
            <View
              pointerEvents="none"
              style={[styles.icon, {backgroundColor: '#FC0'}]}>
              <StStar />
            </View>
            <Text style={{marginLeft: 20}}>Giới thiệu bạn bè</Text>
            <View pointerEvents="none" style={styles.rightIcon}>
              <RightArrow />
            </View>
          </TouchableOpacity>
          {/* --- */}
          {/* <TouchableOpacity
            style={[styles.bodyItem, {marginBottom: 20}]}
            onPress={() => {}}>
            <View
              pointerEvents="none"
              style={[styles.icon, {backgroundColor: '#007AFF'}]}>
              <StLanguage />
            </View>
            <Text style={{marginLeft: 20}}>Ngôn ngữ</Text>
            <View pointerEvents="none" style={styles.rightIcon}>
              <RightArrow />
            </View>
          </TouchableOpacity> */}
          {/* End */}
          <TouchableOpacity
            style={styles.bodyItem}
            onPress={() =>
              Linking.openURL('https://.wordpress.com/privacy/')
            }>
            <View
              pointerEvents="none"
              style={[styles.icon, {backgroundColor: '#8F8E94'}]}>
              <StArticle />
            </View>
            <Text style={{marginLeft: 20}}>Chính sách & Điều khoản</Text>
            <View pointerEvents="none" style={styles.rightIcon}>
              <RightArrow />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bodyItem}
            onPress={() =>
              Linking.openURL(
                'https://www.facebook.com/',
              )
            }>
            <View
              pointerEvents="none"
              style={[styles.icon, {backgroundColor: '#FF2D55'}]}>
              <StContact />
            </View>
            <Text style={{marginLeft: 20}}>Liên hệ</Text>
            <View pointerEvents="none" style={styles.rightIcon}>
              <RightArrow />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
