import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Header, SkeletonPlaceholder} from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {goBack, navigate} from '../../navigation/navigationService';
import Item from './Item';
import {verticalScale} from 'react-native-size-matters';
import Spinner from 'react-native-loading-spinner-overlay';
import {colors} from '../../theme/colors';
import {
  getListDriverRecommend,
  addDriverToOder,
  addDriverToOderRandom,
} from './Helper/Functions';
import {useSelector} from 'react-redux';
const itemHeight = verticalScale(120);
const renderLeft = () => <AntDesign name="arrowleft" size={24} />;
const renderRight = () => {
  return <Text style={styles.randomTitle}>Ngẫu nhiên</Text>;
};
export default function ListShipper({navigation, route}) {
  const oderId = route?.params?.idOder;
  const token = useSelector(
    (state) => state.authReducer.currentUser?.accessToken,
  );
  const handleNotification = useSelector((state) => state.handleNotifiReducer);
  const [listDriver, setListDriver] = useState([]);
  let currentPage = useRef(1);
  const [isWaiting, setIsWaiting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const renderItem = useCallback(({item, index}) => {
    return (
      <Item
        item={item}
        index={index}
        waitingShipper={() => waitingShipper(item)}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getList = useCallback(async (page) => {}, []);
  const keyExtractor = useCallback((item, index) => `${index}`, []);
  const handleLoadMore = () => {
    currentPage.current = currentPage.current + 1;
    getList(currentPage);
  };

  const getItemLayout = useCallback(
    (data, index) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [],
  );

  const getListDriver = useCallback(
    (page) => {
      setLoading(true);
      getListDriverRecommend(token, page, oderId).then((res) => {
        setLoading(false);
        setRefreshing(false);
        if (res.status === 200) {
          console.log('List tai xe refresh', res.resJson.data);
          if (res.resJson.data?.length > 0 || res.resJson.data?.length === 0) {
            setListDriver(res.resJson.data);
          }
        } else {
          Alert.alert(
            'Thông báo',
            'Hệ thống đang bảo trì, vui lòng thử lại sau.',
            [{text: 'Đồng ý', onPress: () => console.log(res)}],
          );
        }
      });
    },
    [oderId, token],
  );
  useEffect(() => {
    getListDriver(currentPage.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    currentPage.current = 1;
    setRefreshing(true);
    getListDriver(currentPage.current);
  };

  //Drive
  const waitingShipper = (item) => {
    const driver_id = item.id;
    console.log(driver_id);
    setIsWaiting(true);
    addDriverToOder(token, driver_id, oderId).then((res) => {
      if (res.status === 200) {
        console.log('Dang doi tai xe xac nhan');
      }
    });
  };

  //Random driver
  const randomDriver = () => {
    setIsWaiting(true);
    addDriverToOderRandom(token, oderId).then((res) => {
      if (res.status === 200) {
        console.log('Dang doi tai xe xac nhan');
      }
    });
  };

  //Handle accept oder
  useEffect(() => {
    console.log('Handle root', handleNotification);
    const {data, link} = handleNotification;
    console.log('check', data);
    if (data?.key === 'AcceptOder') {
      setIsWaiting(false);
      navigate('Tracking', {item: data});
    }
    if (data?.key === 'NoAvailableDriver') {
      setIsWaiting(false);
      Alert.alert('Thông báo', 'Không có tài xế sẵn sàng nhận đơn', [
        {text: 'Đồng ý', onPress: () => {}},
        {text: 'Huỷ', onPress: () => {}},
      ]);
    }
    if (data?.key === 'CancelOder') {
      setIsWaiting(false);
      Alert.alert('Thông báo', 'Tài xế không nhận đơn hàng, thử lại', [
        {text: 'Đồng ý', onPress: () => {}},
        {text: 'Huỷ', onPress: () => {}},
      ]);
    }
    return () => {
      // dispatch(removeLink());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleNotification]);

  return (
    <View style={styles.container}>
      <Header
        title="Tài xế"
        renderLeft={renderLeft}
        onPressLeft={goBack}
        renderRight={renderRight}
        onPressRight={randomDriver}
      />

      {loading ? (
        <SkeletonPlaceholder />
      ) : (
        <FlatList
          data={listDriver}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          maxToRenderPerBatch={15}
          updateCellsBatchingPeriod={50}
          onEndReachedThreshold={0.75}
          // onEndReached={handleLoadMore}
          getItemLayout={getItemLayout}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
      <Spinner
        visible={isWaiting}
        textStyle={{color: colors.green_background}}
        color={colors.greenOpacity}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    paddingBottom: 55, // max height bottombar
  },
  randomTitle: {
    fontWeight: '600',
  },
});
