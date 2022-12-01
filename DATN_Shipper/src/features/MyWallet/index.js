import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import images from '../../assets/images';
import {Dollar} from '../../assets/svg/Svg';
import {colors} from '../../theme/colors';
import Header from './item/Header';
const data = [
  {
    id: 1,
    date: '5/11/2022',
    code: '#123456',
    value: '500000',
  },
  {
    id: 2,
    date: '5/11/2022',
    code: '#123456',
    value: '500000',
  },
  {
    id: 3,
    date: '5/11/2022',
    code: '#123456',
    value: '500000',
  },
  {
    id: 4,
    date: '5/11/2022',
    code: '#123456',
    value: '500000',
  },
  {
    id: 5,
    date: '5/11/2022',
    code: '#123456',
    value: '500000',
  },
];
export default function Wallet({props, navigation}) {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.txtDate}>{item.date}</Text>
          <Text style={styles.textCode}>{item.code}</Text>
        </View>
        <Text style={styles.txtMoney}>
          {item.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}đ
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={500000} />
      <TouchableOpacity
        style={styles.btnAddWallet}
        onPress={() => {
          navigation.navigate('AddWallet');
        }}>
        <View pointerEvents="none" style={styles.icon}>
          <Dollar />
        </View>
        <Text style={styles.txtAdd}>Nạp thêm</Text>
        <Image style={styles.rightArrowBtn} source={images.rightArrow} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.txt1}>LỊCH SỬ NẠP TIỀN</Text>
        <View style={styles.contentHistory}>
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  content: {
    flex: 1,
  },
  btnAddWallet: {
    width: '90%',
    height: verticalScale(88),
    backgroundColor: colors.white_background,
    marginTop: -40,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    width: scale(54),
    height: scale(54),
    backgroundColor: '#FFD428',
    borderRadius: 999999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtAdd: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#242A37',
    marginLeft: scale(15),
  },
  rightArrowBtn: {
    marginLeft: scale(107),
  },
  txt1: {
    marginLeft: '5%',
    marginTop: 20,
    marginBottom: 10,
    color: '#D8D8D8',
  },
  contentHistory: {
    flex: 1,
    width: '90%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.white_background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignSelf: 'center',
  },
  item: {
    height: verticalScale(69),
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtDate: {
    marginBottom: 10,
    fontSize: scale(17),
    fontWeight: '500',
  },
  textCode: {
    color: '#D8D8D8',
  },
  txtMoney: {
    fontSize: scale(17),
    fontWeight: '500',
  },
});
