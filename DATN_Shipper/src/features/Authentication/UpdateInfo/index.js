import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Platform} from 'react-native';
import {scale} from 'react-native-size-matters';
import Header from '../Item/Header';
import FastImage from 'react-native-fast-image';
import {Button} from '../../../components';
import OptionalModal from './Item/OptionalImage';
import ImagePicker from 'react-native-image-crop-picker';
import images from '../../../assets/images';
import Spinner from 'react-native-loading-spinner-overlay';
import {styles} from './styles';
import {TextInput} from 'react-native-paper';
import {colors} from '../../../theme/colors';
import storage from '@react-native-firebase/storage';
import {useSelector, useDispatch} from 'react-redux';
import {upDateInfo} from '../Helper/Function';
import {updateInfo} from '../../../redux/reducers/authenticationSlice';
export default function Update({props, navigation, route}) {
  const token = useSelector((state) => state.auth.currentUser.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [imageKey, setImageKey] = useState(null);
  const [name, setName] = useState('');
  const phoneNumber = route?.params?.phone;
  const [info, setInfo] = useState({
    gplx1: '', // Giấy phép lái xe 2 ảnh,
    gplx2: '',
    dkx: '', // Đăng kí xe 1 ảnh
    bhx: '', // Bảo hiểm xe 1 ảnh
    cmnd1: '', // CMND 2 mặt
    cmnd2: '',
  });
  const [arrURL, setArrURL] = useState([]);
  const temp = useRef([]);
  const [isCheck, setIsCheck] = useState(temp.current.length);
  const closeModal = () => {
    setIsModal(false);
  };
  const selectImage = () => {
    setIsModal(false);
    ImagePicker.openPicker({
      // width: 400,
      // height: 400,
      cropping: false,
    }).then((image) => {
      switch (imageKey) {
        case 1:
          setInfo({
            ...info,
            gplx1: image.path,
          });
          break;
        case 2:
          setInfo({
            ...info,
            gplx2: image.path,
          });
          break;
        case 3:
          setInfo({
            ...info,
            dkx: image.path,
          });
          break;
        case 4:
          setInfo({
            ...info,
            bhx: image.path,
          });
          break;
        case 5:
          setInfo({
            ...info,
            cmnd1: image.path,
          });
          break;
        case 6:
          setInfo({
            ...info,
            cmnd2: image.path,
          });
          break;
        default:
          break;
      }
    });
  };
  console.log('info=>',info);
  useEffect(() => {
    const key = route?.params?.key;
    const imagePatch = route?.params?.image?.uri;
    switch (key) {
      case 1:
        setInfo({
          ...info,
          gplx1: imagePatch,
        });
        break;
      case 2:
        setInfo({
          ...info,
          gplx2: imagePatch,
        });
        break;
      case 3:
        setInfo({
          ...info,
          dkx: imagePatch,
        });
        break;
      case 4:
        setInfo({
          ...info,
          bhx: imagePatch,
        });
        break;
      case 5:
        setInfo({
          ...info,
          cmnd1: imagePatch,
        });
        break;
      case 6:
        setInfo({
          ...info,
          cmnd2: imagePatch,
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);
  const openCamera = async (key) => {
    setIsModal(false);
    navigation.navigate('CaptureImage', {key});
  };
  const upLoadImage = useCallback(async (item) => {
    console.log(item);
    let uploadUri =
      Platform.OS === 'ios' ? item.patch.replace('file://', '') : item.patch;
    let fileName = item.name;
    const storageRef = storage().ref(`Driver/${phoneNumber}/${fileName}`);
    const task = storageRef.putFile(uploadUri);
    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      // console.log(
      //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      // );
      // console.log(
      //   Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
      //     100,
      // );
    });
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      console.log('url download', url);
      setArrURL([...arrURL, ...url]);
      temp.current = temp.current.concat(url);
      console.log(temp.current.length);
      setIsCheck(isCheck + 1);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('temp',temp)
  const confirm = () => {
    setLoading(true);
    const data = [
      {
        name: 'gplx1',
        patch: info.gplx1,
      },
      {
        name: 'gplx2',
        patch: info.gplx2,
      },
      {
        name: 'dkx',
        patch: info.dkx,
      },
      {
        name: 'bhx',
        patch: info.bhx,
      },
      {
        name: 'cmnd1',
        patch: info.cmnd1,
      },
      {
        name: 'cmnd2',
        patch: info.cmnd2,
      },
    ];
    console.log('data======>',data);
    try {
      data.map((e) => {
        upLoadImage(e);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (temp.current.length === 6) {
      const body = {
        baohiem_url: temp.current[0],
        cmnd_front_url: temp.current[2],
        cmnd_back_url: temp.current[1],
        dangky_xe_url: temp.current[3],
        gplx_back_url: temp.current[4],
        gplx_front_url: temp.current[5],
        name: name,
      };
      console.log('body===>',body)
      upDateInfo(token, body).then((res) => {
        setLoading(false);
        if (res.status === 200) {
          dispatch(updateInfo(res.resJson.data));
        }
      });
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrURL]);
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Cập nhật thông tin"
        content="Vui lòng upload hình ảnh giấy tờ xe và các loại giấy tờ được yêu cầu như bên dưới để hoàn tất thủ tục đăng ký."
      />
      <ScrollView style={styles.content}>
        <View style={styles.item}>
          <View style={styles.topItem}>
            <Text>GIẤY PHÉP LÁI XE</Text>
            <Text>(0/2)</Text>
          </View>
          <View style={styles.bottomItem}>
            <TouchableOpacity
              onPress={() => {
                setImageKey(1);
                setIsModal(true);
              }}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.image}
                source={info.gplx1 === '' ? images.camera : {uri: info.gplx1}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setImageKey(2);
                setIsModal(true);
              }}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.image}
                source={info.gplx2 === '' ? images.camera : {uri: info.gplx2}}
              />
            </TouchableOpacity>
            <Text>Chụp rõ 2 mặt (trước/sau)</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.topItem}>
            <Text>ĐĂNG KÝ XE</Text>
          </View>
          <View style={styles.bottomItem1}>
            <TouchableOpacity
              onPress={() => {
                setImageKey(3);
                setIsModal(true);
              }}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.image}
                source={info.dkx === '' ? images.camera : {uri: info.dkx}}
              />
            </TouchableOpacity>

            <Text style={{marginLeft: scale(20)}}>
              Đăng kí chứng nhận xe cơ giới
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.topItem}>
            <Text>BẢO HIỂM XE</Text>
          </View>
          <View style={styles.bottomItem1}>
            <TouchableOpacity
              onPress={() => {
                setImageKey(4);
                setIsModal(true);
              }}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.image}
                source={info.bhx === '' ? images.camera : {uri: info.bhx}}
              />
            </TouchableOpacity>

            <Text style={{marginLeft: scale(20)}}>
              Bảo hiểm xe (tối thiểu 3 tháng)
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.topItem}>
            <Text>CMND HOẶC CĂN CƯỚC CÔNG DÂN</Text>
            <Text>(0/2)</Text>
          </View>
          <View style={styles.bottomItem}>
            <TouchableOpacity
              onPress={() => {
                setImageKey(5);
                setIsModal(true);
              }}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.image}
                source={info.cmnd1 === '' ? images.camera : {uri: info.cmnd1}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setImageKey(6);
                setIsModal(true);
              }}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.image}
                source={info.cmnd2 === '' ? images.camera : {uri: info.cmnd2}}
              />
            </TouchableOpacity>
            <Text>Chụp rõ 2 mặt (trước/sau)</Text>
          </View>
        </View>
        <Text style={styles.txtCode}>Tên hiển thị</Text>
        <TextInput
          style={styles.inputCode}
          placeholder="Trùng với thông tin giấy tờ"
          clearButtonMode="always"
          underlineColor={colors.greenOpacity}
          onChangeText={(value) => {
            setName(value);
          }}
        />
        <Text style={styles.txtCode}>Mã giới thiệu( Nếu có)</Text>
        <TextInput
          style={styles.inputCode}
          placeholder="ACTVN2022"
          clearButtonMode="always"
          underlineColor={colors.greenOpacity}
        />
        <Button onPress={confirm} style={styles.button} title="Hoàn tất" />
        <OptionalModal
          isModal={isModal}
          close={closeModal}
          selectImage={selectImage}
          openCamera={openCamera}
          imageKey={imageKey}
        />
        <Spinner visible={loading} textStyle={{color: '#FFF'}} />
      </ScrollView>
    </View>
  );
}
