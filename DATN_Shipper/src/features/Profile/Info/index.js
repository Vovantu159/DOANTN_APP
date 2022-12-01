import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {Header} from '../../../components';
import {Back, Star} from '../../../assets/svg/Svg';
import images from '../../../assets/images';
import {styles} from './styles';
import {useSelector} from 'react-redux';
export default function Info({props, navigation}) {
  const profile = useSelector((state) => state.auth.currentUser.profile);
  const renderLeft = () => <Back />;
  const renderRight = () => (
    <View>
      <Text style={styles.txt1}>Edit</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        renderLeft={renderLeft}
        onPressLeft={() => {
          navigation.goBack();
        }}
        title=""
        onPressRight={() => {
          navigation.navigate('EditProfile', profile);
        }}
        // renderRight={renderRight}
      />
      <View style={styles.content}>
        <Image
          style={styles.avt}
          defaultSource={images.avatar}
          source={{uri: profile?.avatar}}
        />
        <Text style={styles.txt2}>{profile.name}</Text>
        <View pointerEvents="none" style={styles.star}>
          <Star />
          <Text style={styles.txt3}>{profile.review_rate ?? 5.0}</Text>
        </View>
        <ScrollView
          style={{flex: 1, backgroundColor: '#F7F8FA', marginTop: 40}}>
          <Text style={styles.txt4}>INFORMATIONS</Text>
          <View style={styles.item}>
            <Text style={styles.txt5}>Số điện thoại</Text>
            <Text style={styles.txt6}>{profile?.phone_number}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.txt5}>Email</Text>
            <Text style={styles.txt6}>vovantu159@gmail.com</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.xt5}>Giới tính</Text>
            <Text style={styles.txt6}>Nam</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.txt5}>Ngày sinh</Text>
            <Text style={styles.txt6}>31/03/1999</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
