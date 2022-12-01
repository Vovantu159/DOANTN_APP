import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {LeftArrowIcon, LocationStart} from '../../assets/svg/Svg';
import {GoogleAutoSearch, Header, TextInputOutLine} from '../../components';
import {goBack} from '../../navigation/navigationService';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import OptionalModal from './Item/OptionalImage';
import storage from '@react-native-firebase/storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {updateAvatar, upLoadImage} from './Helper/Function';
import {updateProfileApi} from '../CreateDelivering/Helper/Function';
import {updateProfile} from '../../redux/reducers/authenSlice';
const renderLeft = () => <LeftArrowIcon />;
export default function InfoStore({props, navigation, route}) {
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [nameStore, setNameStore] = useState(currentUser?.name);
  const [location, setLocation] = useState({});
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //
  const [isModal, setIsModal] = useState(false);
  const closeModal = () => {
    setIsModal(false);
  };

  const selectImage = () => {
    setIsModal(false);
    ImagePicker.openPicker({
      // width: 400,
      // height: 400,
      cropping: false,
    }).then(async (image) => {
      // setAvatar(image.path);
      const url = await upLoadImage(image, currentUser?.phoneNumber);
      await setAvatar(url);
      updateAvatar(currentUser?.accessToken, url).then((res) => {
        console.log('avatar', res);
        if (res.status === 200) {
          const profile = {
            avatar: res?.resJson?.avatar,
          };
          dispatch(updateProfile(profile));
        }
      });
      // setAvatar(upLoadImage(image, currentUser?.phoneNumber));
    });
  };

  const openCamera = () => {
    setIsModal(false);
    navigation.navigate('CaptureImage');
  };
  const submit = useCallback(() => {
    setIsLoading(true);
    setEditable(false);
    const body = {
      name: nameStore,
      address: {
        lat: location.location?.lat,
        lon: location.location?.lng,
        desc: location?.description,
      },
      phone_number: phoneNumber,
    };
    console.log('body', body);
    updateProfileApi(currentUser.accessToken, body).then((res) => {
      setIsLoading(false);
      if (res.status === 200) {
        console.log(res);
        const profile = {
          name: res.resJson.data.name,
          address: res.resJson.data.address,
          phoneNumber: res.resJson.data.phone_number,
        };
        dispatch(updateProfile(profile));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, nameStore, phoneNumber]);
  const renderRight = useCallback(() => {
    return !editable ? (
      <TouchableOpacity onPress={() => setEditable(true)}>
        <Text>Sửa</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={submit}>
        <Text>Xong</Text>
      </TouchableOpacity>
    );
  }, [editable, submit]);
  useEffect(() => {
    const imagePatch = route?.params?.image?.uri;
    setAvatar(imagePatch);
  }, [route]);
  useEffect(() => {
    setAvatar(currentUser?.avatar);
    setLocation(currentUser?.address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);
  useEffect(() => {
    console.log('new locaiton', location);
  }, [location]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        renderLeft={renderLeft}
        title="Thông tin cửa hàng"
        onPressLeft={goBack}
        renderRight={renderRight}
      />
      <View>
        <TouchableOpacity
          onPress={() => {
            setIsModal(true);
          }}>
          <Spinner visible={isLoading} textStyle={styles.spinnerTextStyle} />
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.image}
            source={
              // avatar === ''
                // ?
                 require('../../assets/images/camera.png')
                // : {uri: avatar}
            }
            // source={
            //   avatar === null
            //     ? require('../../assets/images/camera.png')
            //     : {uri: avatar}
            // }
          />
        </TouchableOpacity>
      </View>
      <TextInputOutLine
        editable={editable}
        style={styles.input}
        label="Tên cửa hàng"
        placeholder="Cửa hàng"
        value={nameStore}
        onChangeText={(value) => setNameStore(value)}
      />
      <TextInputOutLine
        editable={false}
        style={styles.input}
        label="Điện thoại liên hệ"
        placeholder="Số điện thoại cửa hàng"
        value={phoneNumber}
        onChangeText={(value) => setPhoneNumber(value)}
      />
      <Text style={styles.label}>Địa chỉ</Text>
      {!editable ? (
        <Text numberOfLines={2} style={styles.txtLocation}>
          {location?.description
            ? location?.description
            : currentUser?.address?.desc}
        </Text>
      ) : (
        <GoogleAutoSearch
          textInputContainer={styles.inputLocation}
          placeholder={
            location?.description ? location?.description : 'Chọn địa chỉ'
          }
          listView={styles.inputLocation}
          onPress={(data, details = null) => {
            setLocation({
              description: data.description,
              location: details.geometry.location,
            });
          }}
          textInput={styles.textInput}
        />
      )}
      <OptionalModal
        isModal={isModal}
        close={closeModal}
        selectImage={selectImage}
        openCamera={openCamera}
      />
    </SafeAreaView>
  );
}
