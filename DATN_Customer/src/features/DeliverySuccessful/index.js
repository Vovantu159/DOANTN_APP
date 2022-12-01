import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Header} from '../../components';
import Item from './Item';
import {verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {getListComplete} from './Helper/Functions';
import {colors} from '../../theme/colors';
const itemHeight = verticalScale(150);
export default function SuccessfulDelivery({props, navigation}) {
  const token = useSelector(
    (state) => state.authReducer.currentUser?.accessToken,
  );
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [listComplete, setListComplete] = useState([]);
  let currentPage = useRef(1);
  const renderLeft = () => <AntDesign name="menu-fold" size={28} />;
  const renderItem = useCallback(({item, index}) => {
    return <Item item={item} index={index} />;
  }, []);
  const keyExtractor = useCallback((item, index) => `${index}`, []);
  const handleLoadMore = () => {
    currentPage.current = currentPage.current + 1;
    getListComplete(token, currentPage.current).then((res) => {
      if (res.status === 200) {
        setListComplete([...listComplete, ...res.resJson.data]);
      }
    });
  };
  const getItemLayout = useCallback(
    (data, index) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [],
  );
  const getData = useCallback(
    (page) => {
      getListComplete(token, page).then((res) => {
        setLoading(false);
        setRefreshing(false);
        console.log(res);
        if (res.status === 200) {
          setListComplete(res.resJson.data);
        }
      });
    },
    [token],
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getData(currentPage.current);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  const handleRefreshing = () => {
    currentPage.current = 1;
    setRefreshing(true);
    getData(currentPage.current);
  };
  const openMenu = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Đơn hoàn thành"
        renderLeft={renderLeft}
        onPressLeft={openMenu}
      />
      <ActivityIndicator size="small" color={colors.gray} animating={loading} />
      <FlatList
        data={listComplete}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={15}
        updateCellsBatchingPeriod={50}
        onEndReachedThreshold={0.75}
        // onEndReached={handleLoadMore}
        getItemLayout={getItemLayout}
        refreshing={refreshing}
        onRefresh={handleRefreshing}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    flex: 1,
  },
  list: {
    flexGrow: 1,
    paddingBottom: 55, // max height bottombar
  },
});
