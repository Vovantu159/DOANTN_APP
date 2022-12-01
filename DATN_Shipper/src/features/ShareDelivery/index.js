import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Header} from '../../components';
import {colors} from '../../theme/colors';
import {Drawer} from '../../assets/svg/Svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getGroups, shareOder} from './Helper/Function';
import {Item} from './Helper/Item';
import Entypo from 'react-native-vector-icons/Entypo';
import images from '../../assets/images';
import {navigate} from '../../navigation/navigationService';
const renderLeft = () => <Drawer />;
const renderRight = () => <AntDesign name="plus" size={24} />;
const itemHeight = 100;
export default function ShareDelivery({navigation, route}) {
  const oderId = route?.params?.oderId;
  const token = useSelector((state) => state.auth.currentUser.token);
  const [listDriver, setListDrive] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // console.log('check', route);
  // console.log(token);
  console.log('oder id', oderId);

  const getItemList = useCallback(
    (value) => {
      console.log('item', value);
      if (typeof oderId !== 'undefined') {
        shareOder(token, oderId, value?.id).then((res) => {
          console.log('res share', res);
          if (res.status === 200) {
            Alert.alert('Thông báo', 'Chia sẻ đơn thành công', [
              {text: 'Tiếp tục', onPress: () => navigate('Main')},
            ]);
          } else {
            Alert.alert('Thông báo', 'Không thể chia sẻ đơn', [
              {text: 'Lựa chọn khác', onPress: () => console.log(res)},
            ]);
          }
        });
      }
    },
    [oderId, token],
  );
  const getData = useCallback(() => {
    getGroups(token).then((res) => {
      console.log('res tai xe', res);
      setRefreshing(false);
      if (res.status === 200) {
        setListDrive(res.resJson);
      }
    });
  }, [token]);
  useFocusEffect(
    React.useCallback(() => {
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <TouchableOpacity style={styles.item} onPress={() => getItemList(item)}>
          <Image
            style={styles.img}
            source={{uri: item?.avatar}}
            defaultSource={images.avatar}
          />
          <View style={styles.contentItem}>
            <View style={{flex: 1}}>
              <Text style={styles.txtItem}>{item?.name}</Text>
              <Text style={styles.txtItem}>
                Trạng thái: {item?.status === 1 ? 'Sẵn sàng' : 'Không sẵn sàng'}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Entypo
                style={{alignSelf: 'flex-end', marginRight: 20}}
                name="share"
                size={24}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [getItemList],
  );
  const keyExtractor = useCallback((item, index) => `${index}`, []);
  const handleRefresh = () => {
    setRefreshing(true);
    console.log('refresh data');
    getData();
  };
  return (
    <View style={styles.container}>
      <Header
        title="Chia sẻ đơn"
        renderLeft={renderLeft}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={renderRight}
        onPressRight={() => {
          navigation.navigate('AddGroup');
        }}
      />

      <FlatList
        data={listDriver}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  item: {
    height: itemHeight,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  img: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginLeft: 20,
    borderRadius: 9999,
  },
  contentItem: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 20,
    flexDirection: 'row',
  },
  txtItem: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
  },
});
