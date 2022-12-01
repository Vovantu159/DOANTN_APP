import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Header} from '../../../components';
import images from '../../../assets/images';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';
import storage from '@react-native-firebase/storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {BaseURL} from '../../../constants/Service';
import {useSelector, useDispatch} from 'react-redux';
import {getProfile} from '../../Setting/Helper/Function';
import {updateInfo} from '../../../redux/reducers/authenticationSlice';
import {navigate} from '../../../navigation/navigationService';
export default function EditProfile({props, navigation, route}) {
  console.log(route);
  const info = route?.params;
  const [avt, setAvt] = useState('');
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.currentUser.token);
  const dispatch = useDispatch();
  const renderRight = () =>
    avt !== '' ? <Text style={styles.txt2}>Xong</Text> : null;
  const selectImage = () => {
    ImagePicker.openPicker({
      // width: 400,
      // height: 400,
      cropping: false,
    }).then((image) => {
      setAvt(image.path);
    });
  };
  const updateAvatar = async () => {
    setLoading(true);
    let uploadUri = Platform.OS === 'ios' ? avt.replace('file://', '') : avt;
    let fileName = 'avatar';
    const storageRef = storage().ref(`Driver/${info.phone_number}/${fileName}`);
    const task = storageRef.putFile(uploadUri);
    // Set transferred stateSS
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
      upLoadAvatar(token, url).then((res) => {
        if (res.status === 200) {
          getProfile(token).then((res1) => {
            if (res1.status === 200) {
              setLoading(false);
              dispatch(updateInfo(res1.resJson.data));
              navigate('Main');
            }
          });
        }
      });
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title=""
        style={styles.header}
        // renderLeft={renderLeft}
        renderRight={renderRight}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={updateAvatar}
      />
      <View style={styles.top}>
        <TouchableOpacity style={{marginLeft: 20}} onPress={selectImage}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.avt}
            source={avt === '' ? images.avatar : {uri: avt}}
          />
          <View style={styles.cameraIcon}>
            <Image source={images.camera} />
          </View>
          <Text style={styles.txtEdit}>Edit photo</Text>
        </TouchableOpacity>
        <View style={styles.input}>
          <TextInput style={styles.txtInput} value={info?.name} />
        </View>
      </View>
      <Spinner visible={loading} textStyle={{color: '#FFF'}} />

      <View style={styles.line} />
      <ScrollView style={styles.content}>
        <View style={styles.item}>
          <Text style={styles.txt5}>Số điện thoại</Text>
          <Text style={styles.txt6}>{info?.phone_number}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.txt5}>Email</Text>
          <Text style={styles.txt6}>vovantu159@gmail.com</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.xt5}>Giới tính</Text>
          <Text style={styles.txt6}>Nam</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.txt5}>Ngày sinh</Text>
          <Text style={styles.txt6}>14/05/1999</Text>
        </View>
      </ScrollView>
    </View>
  );
}
const upLoadAvatar = async (token, url) => {
  try {
    let response = await fetch(BaseURL + '/driver/profile/avatar', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        avatar: url,
      }),
    });
    let responseJson = await response.json();
    return {
      status: response.status,
      resJson: responseJson,
    };
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
};
