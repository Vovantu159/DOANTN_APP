import React, {Component} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import images from '../../../assets/images';
import {Header} from '../../../components';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../theme/colors';
import {Visa, MasterCard, PayPal, Card, Back} from '../../../assets/svg/Svg';
const data = [
  {
    id: 1,
    date: '05/11/2022',
    code: '#123456',
    value: '500000',
  },
  {
    id: 2,
    date: '05/11/2022',
    code: '#123456',
    value: '500000',
  },
  {
    id: 3,
    date: '05/11/2022',
    code: '#123456',
    value: '500000',
  },
];
export default function AddWallet({props, navigation}) {
  const renderLeft = () => {
    return (
      <View pointerEvents="none">
        <Back />
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <View style={styles.iconItem}>
          <Image source={images.addCard} />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header
        renderLeft={renderLeft}
        title="Phương thức thanh toán"
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <TouchableOpacity
        style={styles.btnAddWallet}
        onPress={() => {
          navigation.navigate('AddWallet');
        }}>
        <View pointerEvents="none" style={styles.icon}>
          {/* <Image source={images.addCard} /> */}
          <Card />
        </View>
        <Text style={styles.txtAdd}>Thêm thẻ thanh toán</Text>
        <Image style={styles.rightArrowBtn} source={images.rightArrow} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.txt1}>LỊCH SỬ NẠP TIỀN</Text>
        <View style={styles.contentHistory}>
          {/* <FlatList
            contentContainerStyle={{flex: 1}}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}`}
          /> */}
          <View style={styles.item}>
            <View pointerEvents="none" style={styles.iconItem}>
              <Visa />
            </View>
            <View style={styles.rightItem}>
              <Text style={styles.numberCard}>**** **** **** 3765</Text>
              <Text style={styles.typeCard}>VISA</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View pointerEvents="none" style={styles.iconItem}>
              <PayPal />
            </View>
            <View style={styles.rightItem}>
              <Text style={styles.numberCard}>vidu@ango.vn</Text>
              <Text style={styles.typeCard}>Paypal</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View pointerEvents="none" style={styles.iconItem}>
              <MasterCard />
            </View>
            <View style={styles.rightItem}>
              <Text style={styles.numberCard}>**** **** **** 3765</Text>
              <Text style={styles.typeCard}>Master Card</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  btnAddWallet: {
    width: '90%',
    height: verticalScale(81),
    backgroundColor: colors.white_background,
    marginTop: 20,
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
    marginLeft: scale(10),
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
    minHeight: verticalScale(69),
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  iconItem: {
    width: scale(54),
    height: scale(54),
    backgroundColor: '#F1F2F6',
    borderRadius: 999999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightItem: {
    marginLeft: 20,
  },
  numberCard: {
    fontSize: 18,
    fontWeight: '500',
  },
  typeCard: {
    color: '#D8D8D8',
    marginTop: 5,
  },
});
