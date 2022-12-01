import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../theme/colors';
import {Header, Button} from '../../components';
import {Drawer, Friends} from '../../assets/svg/Svg';
import {ScrollView} from 'react-native-gesture-handler';
import Clipboard from '@react-native-community/clipboard';
export default function Invitefriends({props, navigation}) {
  const renderLeft = () => <Drawer />;
  const copyCode = () => {
    Clipboard.setString('ACTVN2022');
  };
  return (
    <ScrollView style={styles.container}>
      <Header
        renderLeft={renderLeft}
        onPressLeft={() => {
          navigation.goBack();
        }}
        title="Mời bạn bè gia nhập"
      />
      <View pointerEvents="none" style={styles.icon}>
        <Friends />
      </View>
      <Text style={styles.txt1}>Mời bạn bè tham gia</Text>
      <Text style={styles.txt2}>
        Nhận tới <Text style={{fontWeight: 'bold'}}>5,000,000</Text> tiền mặt
      </Text>
      <Text style={styles.txt3}>
        Khi bạn của bạn đăng ký bằng mã giới thiệu của bạn, bạn có thể nhận được
        tới 5,000,000đ tiền mặt.
      </Text>
      <Text style={styles.txt4}>CHI SẺ MÃ VỚI BẠN BÈ</Text>
      <Button onPress={copyCode} style={styles.btn} title="ACTVN2022" />
      <Button style={styles.btn} title="INVITE" />
    </ScrollView>
  );
}
const WidthIcon = Dimensions.get('window').width / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  icon: {
    height: WidthIcon,
    width: WidthIcon,
    borderRadius: 999999,
    backgroundColor: '#25824A',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  txt1: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 20,
  },
  txt2: {
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 10,
    marginHorizontal: 20,
  },
  txt3: {
    alignSelf: 'center',
    fontSize: 16,

    marginTop: 20,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  txt4: {
    marginTop: 30,
    marginLeft: 20,
    color: '#D8D8D8',
  },
  btn: {
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 20,
  },
});
