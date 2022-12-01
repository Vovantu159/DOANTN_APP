import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {Button, Header, TextInputOutLine} from '../../components';
import Item from './Item';
import {verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {navigate} from '../../navigation/navigationService';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {getListInProcess, getProfile, updatePass} from './Helper/Function';
import {Modal, ModalContent} from 'react-native-modals';
import {SC_HEIGHT, SC_WIDTH} from '../../constants/SizeScreen';
import {colors} from '../../theme/colors';
import {updateProfile} from '../../redux/reducers/authenSlice';
import Spinner from 'react-native-loading-spinner-overlay';
const itemHeight = verticalScale(150);
export default function Delivery({props, navigation}) {
  const [listInProcess, setListInProcess] = useState([]);
  const token = useSelector(
    (state) => state.authReducer.currentUser?.accessToken,
  );
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const [passWord, setPassWord] = useState('');
  const [passWord_cf, setPassWord_cf] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  let currentPage = useRef(1);
  const renderLeft = () => <AntDesign name="menu-fold" size={28} />;
  const renderRight = () => <Entypo name="plus" size={28} />;
  const renderItem = useCallback(({item, index}) => {
    return <Item item={item} index={index} />;
  }, []);
  const keyExtractor = useCallback((item, index) => `${index}`, []);
  const handleLoadMore = () => {
    currentPage.current = currentPage.current + 1;
    getListInProcess(token, currentPage.current).then((res) => {
      if (res.status === 200) {
        setListInProcess([...listInProcess, ...res.resJson.data]);
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
  const openMenu = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);
  useEffect(() => {
    getProfile(token)
      .then((res) => {
        if (res.status === 200) {
          console.log('Check', res.resJSON);
          const profile = {
            name: res.resJSON.name,
            phoneNumber: res.resJSON.phone_number,
            address: res.resJSON.address,
            avatar: res.resJSON.avatar,
          };
          dispatch(updateProfile(profile));
          if (!res.resJSON.hasCredential) {
            setIsModal(true);
          }
        }
      })
      .catch((error) => {
        console.log('Error');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const getData = useCallback(
    (page) => {
      getListInProcess(token, page).then((res) => {
        setLoading(false);
        setRefreshing(false);
        console.log(res);
        if (res.status === 200) {
          setListInProcess(res.resJson.data);
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
  const updatePassword = useCallback(() => {
    updatePass(token, passWord, passWord_cf).then((res) => {
      if (res.status === 204) {
        setIsModal(false);
      }
    });
  }, [passWord, passWord_cf, token]);
  const handleRefresh = () => {
    currentPage.current = 1;
    setRefreshing(true);
    getData(currentPage.current);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Đơn đang giao"
        renderLeft={renderLeft}
        onPressLeft={openMenu}
        renderRight={renderRight}
        onPressRight={() => navigate('CreateDelivering')}
      />
      <ActivityIndicator size="small" color={colors.gray} animating={loading} />
      <FlatList
        data={listInProcess}
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
      <Modal visible={isModal}>
        <ModalContent
          style={{
            width: SC_WIDTH * 0.8,
            height: SC_HEIGHT * 0.4,
            justifyContent: 'center',
          }}>
          <Text style={styles.title}>
            Cập nhật mật khẩu cho những lần đăng nhập sau
          </Text>
          <TextInputOutLine
            label="Mật khẩu"
            style={styles.txtInput}
            value={passWord}
            onChangeText={(outlinedLargeText) => {
              setPassWord(outlinedLargeText);
            }}
          />
          <View style={{height: 20, width: '100%'}} />
          <TextInputOutLine
            label="Xác nhận mật khẩu"
            style={styles.txtInput}
            value={passWord_cf}
            onChangeText={(outlinedLargeText) => {
              setPassWord_cf(outlinedLargeText);
            }}
          />
          {passWord !== passWord_cf ? (
            <Text style={styles.error}>Mật khẩu chưa khớp</Text>
          ) : null}
          <Button
            style={styles.btn}
            title="Cập nhật"
            onPress={updatePassword}
          />
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  list: {
    flexGrow: 1,
    paddingBottom: 55, // max height bottombar
  },
  textInput: {
    marginTop: 18,
    flexDirection: 'row',
  },
  btn: {
    alignSelf: 'center',
    width: SC_WIDTH * 0.7,
    marginTop: 20,
  },
  error: {
    marginLeft: 10,
    color: colors.redColor,
    marginTop: 5,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: colors.green_background,
  },
});
const data = [1, 2, 3, 4];
