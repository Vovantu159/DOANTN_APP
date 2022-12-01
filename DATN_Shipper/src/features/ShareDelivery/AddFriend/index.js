import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../../theme/colors';
import SearchBar from './Search';
import {formatPhoneNumber} from '../../Authentication/Helper/Function';
import {search, addGroups} from '../Helper/Function';
import {useSelector} from 'react-redux';
import {goBack} from '../../../navigation/navigationService';
import images from '../../../assets/images';
export default function AddGroup({navigation}) {
  const token = useSelector((state) => state.auth.currentUser.token);
  const [driver, setDriver] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const searching = useCallback(
    (value) => {
      setIsSearch(true);
      console.log('value', value);
      search(token, formatPhoneNumber(value)).then((res) => {
        console.log('res search', res);
        setIsSearch(false);
        if (res.status === 200) {
          setDriver(res.resJson);
        }
      });
      // console.log('Call api', formatPhoneNumber(value));
    },
    [token],
  );
  const add = () => {
    setIsSearch(true);
    addGroups(token, driver.id).then((res) => {
      setIsSearch(false);
      console.log('res add groups', res);
      if (res.status === 200) {
        //thanh cong
        goBack();
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar searching={searching} navigation={navigation} />
      {driver && (
        <View style={styles.item}>
          <Image
            style={styles.img}
            source={{uri: driver?.avatar}}
            defaultSource={images.avatar}
          />
          <View style={{marginLeft: 20, justifyContent: 'space-evenly'}}>
            <Text>{driver?.name}</Text>
            <Text>Đánh giá: {driver?.review_rate ?? 'Chưa có'}</Text>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity style={{alignItems: 'flex-end'}} onPress={add}>
              <Text style={styles.btnAdd}>Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ActivityIndicator
        size="large"
        color={colors.gray}
        animating={isSearch}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
    paddingHorizontal: 10,
  },
  item: {
    height: 90,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.white_background,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnAdd: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.green_background,
  },
  img: {
    height: 70,
    width: 70,
    borderColor: 'gray',
    borderRadius: 9999,
    borderWidth: 1,
  },
});
