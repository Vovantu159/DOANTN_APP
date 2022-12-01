/* eslint-disable react-native/no-inline-styles */
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import {View, Image, ImageBackground, Text} from 'react-native';
import {styles} from './styles';
import TabCustom from './tabnavigation';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../assets/images';
import {HomeIcon, Notification, Statistics, UserIcon} from '../assets/svg/Svg';
import {fcmService} from '../config/Firebase/FCMService';
import {localNotificationService} from '../config/Firebase/LocalNotificationService';
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from '../redux/reducers/authenSlice';
import {registerTokenFCM} from './Helper/Function';
import {removeLink, upDateLink} from '../redux/reducers/handeNotifiSlice';
import FastImage from 'react-native-fast-image';

const Drawer = createDrawerNavigator();
const DrawerCustom = ({navigation}) => {
  const token = useSelector(
    (state) => state.authReducer.currentUser?.accessToken,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(FCMtoken) {
      console.log('[App] onRegister: ', FCMtoken);
      registerTokenFCM(token, FCMtoken).then((res) => {
        console.log('FCM res', res);
      });
    }

    function onNotification(notify) {
      console.log('[App] onNotification: ', notify);
      // navigate('AwaitAcceptOder');
      const options = {
        soundName: 'default',
        playSound: true, //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify);
      if (typeof notify?.key !== 'undefined') {
        dispatch(
          upDateLink({
            link: notify?.link,
            data: {
              key: notify?.key,
              oderId: notify?.oderId,
            },
          }),
        );
      }
    }

    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Drawer.Navigator
      initialRouteName="MenuTab"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          drawerIcon: () => <AntDesign name="home" size={24} color="green" />,
        }}
        name="Home"
        component={TabCustom}
      />
      {/* <Drawer.Screen name="Detai Home" component={DetaiHome} /> */}
    </Drawer.Navigator>
  );
};
function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.authReducer.currentUser);
console.log('info?.avatar',info?.avatar);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContainer}>
        <ImageBackground
          source={Images.img.drawerbg}
          style={styles.imageHeader}>
          <View style={styles.viewImg}>
            {/* <FastImage style={styles.img} source={Images.img.logo} /> */}
            <Image
              style={styles.img}
              defaultSource={Images.img.logo}
             // source={{uri: info?.avatar}}
              source={Images.img.logo}
            />
          </View>
          <View style={styles.leftView}>
            <Text style={styles.txtName}>{info?.name ?? 'Cua Hang 1'}</Text>
            <ImageBackground
              style={styles.goldImg}
              source={Images.img.goldMember}>
              <AntDesign name="star" size={10} color="#FDD835" />
              <Text style={styles.txtGold}>Gold Member</Text>
            </ImageBackground>
            {/* <Text style={styles.money}>Hoa quả nhập khẩu</Text> */}
          </View>
        </ImageBackground>
      </View>
      <View style={[styles.item, {marginLeft: 15}]}>
        <View pointerEvents="none">
          <HomeIcon />
        </View>
        <DrawerItem
          label="Trang chủ"
          labelStyle={{fontSize: 18}}
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate('Main');
          }}
        />
      </View>
      <View style={styles.item}>
        <View pointerEvents="none">
          <Notification />
        </View>
        <DrawerItem
          label="Thông báo"
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate('Notification');
          }}
        />
      </View>
      {/* <View style={styles.item}>
        <View pointerEvents="none">
          <Statistics />
        </View>
        <DrawerItem
          label="Thống kê"
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate('Statics');
          }}
        />
      </View> */}
      <View style={styles.item}>
        <View pointerEvents="none">
          <UserIcon />
        </View>
        <DrawerItem
          label="Tài khoản"
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate('InfoStore');
          }}
        />
      </View>
      <View style={styles.item}>
        <Image style={{marginLeft: -2}} source={Images.img.logout} />
        <DrawerItem
          label="Đăng xuất"
          onPress={() => {
            dispatch(signOut());
          }}
          labelStyle={styles.label}
        />
      </View>
    </DrawerContentScrollView>
  );
}
export default DrawerCustom;
