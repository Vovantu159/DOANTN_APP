/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Button,
  GoogleAutoSearch,
  Header,
  InputLocation,
  TextInputOutLine,
} from '../../components';
import {Modal, ModalContent} from 'react-native-modals';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../theme/colors';
import {goBack, navigate} from '../../navigation/navigationService';
import InputSpinner from 'react-native-input-spinner';
import Spinner from 'react-native-loading-spinner-overlay';
import {styles} from './styles';
import {createOder, updateProfileApi} from './Helper/Function';
import {useDispatch, useSelector} from 'react-redux';
import {SC_HEIGHT, SC_WIDTH} from '../../constants/SizeScreen';
import {updateProfile} from '../../redux/reducers/authenSlice';
const renderLeft = () => <AntDesign name="arrowleft" size={24} />;
const renderRight = () => <Text style={styles.txtCancel}>Huỷ</Text>;

export default function CreateDelivering({props, navigation}) {
  const token = useSelector(
    (state) => state.authReducer.currentUser?.accessToken,
  );
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);

  //State modal
  const [name_update, setName_update] = useState('');
  const [address_update, setAddress_update] = useState({});
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  console.log('a', currentUser);
  //End
  const refPrice = useRef();
  const [loading, setLoading] = useState(false);
  const [startLocation, setStartLocation] = useState({});
  const [endLocation, setEndLocation] = useState({});
  const [listBill, setListBill] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [note, setNote] = useState('');
  const [receiver, setReceiver] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  /*--Temp state*/
  const [productName, setProductName] = useState('');
  const [countProduct, setCountProduct] = useState(1);
  const [price, setPrice] = useState('0');
  //Check profile
  useEffect(() => {
    if (currentUser.name === null || currentUser.address === null) {
      setIsModal(true);
    }
  }, [currentUser]);
  useEffect(() => {
    setTotalPrice(parseInt(price)*parseInt(countProduct))
  }, [price,countProduct]);
  const addItemList = useCallback(() => {
   
    const item = {
      id: Math.random(10000),
      name: productName,
      count: countProduct,
      price: Number.parseFloat(price),
      totalPrice: countProduct * Number.parseFloat(price),
    };
     console.log('item.totalPrice',item.totalPrice);
    setListBill([...listBill, item]);
    setTotalPrice(totalPrice + item.totalPrice);
    setProductName('');
    setCountProduct(1);
    setPrice(0);
  }, [productName, countProduct, price, listBill, totalPrice]);
  const RenderListItem = () =>
    listBill.map((e) => (
      <View key={e.id} style={styles.itemBill}>
        <Text>{`${e.count} x ${e.name}`}</Text>
        <Text>
          {e.totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
        </Text>
      </View>
    ));
  const createBill = useCallback(() => {
    setLoading(true);
    const items = listBill.map((e) => {
      return {
        name: e.name,
        quantity: e.count,
        price: e.price,
      };
    });
    const body = {
      from_address: {
        lat: startLocation.location.lat,
        lon: startLocation.location.lng,
        desc: startLocation.description,
      },
      to_address: {
        lat: endLocation.location.lat,
        lon: endLocation.location.lng,
        desc: endLocation.description,
      },
      items,
      user_note: note,
      receiver: {
        name: receiver,
        receiverPhone: receiverPhone,
      },
    };
    createOder(
      token,
      body.from_address,
      body.to_address,
      body.items,
      body.user_note,
      body.receiver,
    ).then((res) => {
      setLoading(false);
      console.log('DEBUG', res);
      if (res.status === 200) {
        navigate('ListShipper', {idOder: res.resJson.data.id});
        return;
      }
      if (res.status === 422 && res.resJson?.message?.to_address) {
        Alert.alert('Thông báo', res.resJson?.message?.to_address[0], [
          {text: 'Đồng ý', onPress: () => console.log(res)},
        ]);
        return;
      }
      Alert.alert(
        'Thông báo',
        'Hệ thống đang bảo trì, vui lòng thử lại sau ít phút',
        [{text: 'Đồng ý', onPress: () => console.log(res)}],
      );
    });
  }, [
    startLocation,
    endLocation,
    listBill,
    note,
    receiverPhone,
    receiver,
    token,
  ]);
  console.log('totalPrice======>',totalPrice);
  const resetData = useCallback(() => {
    setStartLocation({});
    setEndLocation({});
    setListBill([]);
    setTotalPrice(0);
    setNote('');
    setProductName('');
    setCountProduct(1);
    setPrice(0);
    setReceiver('');
    setReceiverPhone('');
  }, []);
  const _updateProfile = useCallback(() => {
    const body = {
      name: name_update,
      address: {
        lat: address_update.lat,
        lon: address_update.lon,
        desc: address_update.description,
      },
    };
    updateProfileApi(token, body).then((res) => {
      setIsModal(false);
      if (res.status === 200) {
        const profile = {
          name: res.resJson.data.name,
          address: res.resJson.data.address,
        };
        console.log('Profile new', profile);
        dispatch(updateProfile(profile));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name_update, address_update, token]);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
        <Header
          renderLeft={renderLeft}
          title="Tạo đơn hàng"
          onPressLeft={goBack}
          renderRight={renderRight}
          onPressRight={resetData}
        />

        <InputLocation
          topTiltle="Điểm nhận hàng"
          bottomTitle="Điểm giao hàng"
          inputEndLocation={(data, details = null) => {
            console.log(details.geometry.location);
            setEndLocation({
              description: data.description,
              location: details.geometry.location,
            });
          }}
          inputStartLocation={(data, details = null) => {
            setStartLocation({
              description: data.description,
              location: details.geometry.location,
            });
          }}
        />
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <TextInputOutLine
            value={receiver}
            style={styles.txtInfoProduct}
            label="Người nhận"
            onChangeText={setReceiver}
          />
          <TextInputOutLine
            value={receiverPhone}
            style={[styles.txtInfoProduct, {marginTop: 10}]}
            label="Số điện thoại người nhận"
            onChangeText={setReceiverPhone}
          />
          <View style={styles.txtLine1}>
            <Text style={styles.txtTitle}>Thông tin đơn hàng:</Text>
            {productName !== '' && price !== 0 ? (
              <TouchableOpacity onPress={addItemList}>
                <View style={styles.btnAddItem}>
                  <AntDesign
                    name="pluscircleo"
                    size={14}
                    color={colors.white_background}
                  />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          <TextInputOutLine
            value={productName}
            style={styles.txtInfoProduct}
            label="Sản phẩm"
            onChangeText={setProductName}
          />
          <Text style={styles.txtTitle}>Số lượng</Text>
          <InputSpinner
            skin="clean"
            style={styles.inputCount}
            max={99999}
            min={1}
            step={1}
            colorMax={'#f04048'}
            value={countProduct}
            onChange={setCountProduct}
          />

          <Text style={[styles.txtTitle, {marginTop: 40}]}>Đơn giá:</Text>
          <View style={styles.inputPrice}>
            <TextInput
              ref={refPrice}
              style={{flex: 1}}
              onChangeText={setPrice}
              onFocus={() => setPrice(0)}
              // value={price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
              value={price}
              keyboardType="numeric"
            />
            <Text>Vnđ</Text>
          </View>
          <Text style={styles.txtTitle}>Chi tiết đơn:</Text>
          {/* <View style={styles.itemBill}>
            <Text>1 x Bánh mì dân tổ</Text>
            <Text>35,000đ</Text>
          </View> */}
          <RenderListItem />
          <Text style={[styles.txtTitle]}>
            Thành tiền:{' '}
            <Text style={styles.txtPrice}>
              {totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
              vnd
            </Text>{' '}
          </Text>
          <Text style={styles.txtTitle}>Ghi chú</Text>
          <TextInput
            value={note}
            style={styles.txtNote}
            multiline
            onChangeText={setNote}
          />
          <Button
            onPress={createBill}
            style={styles.btnCreate}
            title="Tạo đơn"
            titleColor={colors.white_background}
          />
        </ScrollView>
        <Spinner
          visible={loading}
          textStyle={{color: colors.greenOpacity}}
          color={colors.greenOpacity}
        />
        <Modal visible={isModal}>
          <ModalContent
            style={{
              width: SC_WIDTH * 0.8,
              minHeight: SC_HEIGHT * 0.45,
              justifyContent: 'center',
            }}>
            <Text style={styles.title}>Cập nhật thông tin tài khoản</Text>
            <TextInputOutLine
              label="Tên hoặc tên cửa hàng"
              style={styles.txtInput}
              value={name_update}
              onChangeText={(outlinedLargeText) => {
                setName_update(outlinedLargeText);
              }}
            />
            <View style={{height: 20, width: '100%'}} />

            <View style={{flex: 1}}>
              <Text
                style={{marginVertical: 10, fontSize: 16, fontWeight: '500'}}>
                Địa chỉ:
              </Text>
              <GoogleAutoSearch
                onPress={(data, details = null) => {
                  console.log('a', details);
                  setAddress_update({
                    description: data.description,
                    lat: details.geometry.location.lat,
                    lon: details.geometry.location.lng,
                  });
                }}
                textInputContainer={styles.textInputContainer}
                textInput={styles.txtInputLocation}
              />
            </View>

            <Button
              style={styles.btn}
              title="Cập nhật"
              onPress={_updateProfile}
            />
          </ModalContent>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
