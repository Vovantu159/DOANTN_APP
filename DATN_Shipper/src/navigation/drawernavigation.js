/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import {View, Image, ImageBackground, Text, Alert} from 'react-native';
import {styles} from './styles';
import images from '../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from '../features/Home';
import {
  HomeIcon,
  Share,
  Statistics,
  CardDrawer,
  Clock,
  Notification,
  Invitefrends,
  Setting,
} from '../assets/svg/Svg';
import {fcmService} from '../config/Firebase/FCMService';
import {localNotificationService} from '../config/Firebase/LocalNotificationService';
import {useDispatch} from 'react-redux';
import {signOut} from '../redux/reducers/authenticationSlice';
import {upDateLink} from '../redux/reducers/handeNotifiSlice';
import {registerTokenFCM} from './Helper/Function';
import {useSelector} from 'react-redux';
const Drawer = createDrawerNavigator();
const DrawerCustom = ({navigation}) => {
  const token = useSelector((state) => state.auth.currentUser?.token);

  const dispatch = useDispatch();
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(FCMtoken) {
      console.log('[App] onRegister: ', FCMtoken);
      registerTokenFCM(token, FCMtoken).then((res) => {
        if (res.status === 401) {
          Alert.alert(
            'Thông báo',
            'Tài khoản đã được đăng nhập trên thiết bị khác, vui lòng đăng nhập lại!',
            [{text: 'Đồng ý', onPress: () => dispatch(signOut())}],
          );
        }
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
        name="Home"
        component={Home}
        options={{
          drawerIcon: () => <Image source={images.home} />,
        }}
      />
      {/* <Drawer.Screen name="Detai Home" component={DetaiHome} /> */}
    </Drawer.Navigator>
  );
};
function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.currentUser.profile);
  console.log('profile', profile);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContainer}>
        <ImageBackground source={images.drawerbg} style={styles.imageHeader}>
          <View style={styles.viewImg}>
            <Image
              style={styles.img}
              defaultSource={images.logo}
              source={{uri: profile?.avatar}}
            />
          </View>
          <View style={styles.leftView}>
            <Text style={styles.txtName}>{profile?.name}</Text>
            <ImageBackground style={styles.goldImg} source={images.goldMember}>
              <AntDesign name="star" size={10} color="#FDD835" />
              <Text style={styles.txtGold}>Gold Member</Text>
            </ImageBackground>
            {/* <Text style={styles.money}>Số dư : 4,300,000</Text> */}
          </View>
        </ImageBackground>
      </View>
      <View style={styles.item}>
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
          <Image source={images.delivering} />
        </View>
        <DrawerItem
          label="Đơn đang giao"
          labelStyle={{fontSize: 18}}
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate('Delivering');
          }}
        />
      </View>
      <View style={styles.item}>
        <View pointerEvents="none">
          <Share />
        </View>
        <DrawerItem
          label="Chia sẻ chuyến đi"
          labelStyle={{fontSize: 18}}
          onPress={() => {
            props.navigation.navigate('ShareDelivery');
          }}
        />
      </View>
      <View style={styles.item}>
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
      </View>
      {/* <View style={styles.item}>
        <View pointerEvents="none">
          <CardDrawer />
        </View>
        <DrawerItem
          label="Ví tài khoản"
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate('Wallet');
          }}
        />
      </View> */}
      <View style={styles.item}>
        <View pointerEvents="none">
          <Clock />
        </View>
        <DrawerItem
          label="Lịch sử chuyến đi"
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate('History');
          }}
        />
      </View>
      {/* <View style={styles.item}>
        <View pointerEvents="none">
          <Notification />
        </View>
        <DrawerItem
          label="Thông báo"
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate('Nofication');
          }}
        />
      </View> */}
      <View style={styles.item}>
        <View pointerEvents="none">
          <Invitefrends />
        </View>
        <DrawerItem
          label="Mời bạn bè"
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate('Invitefriends');
          }}
        />
      </View>
      <View style={styles.item}>
        <View pointerEvents="none">
          <Setting />
        </View>
        <DrawerItem
          label="Thiết lập"
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate('Setting');
          }}
        />
      </View>
      <View style={styles.item}>
        <Image style={{marginLeft: 2}} source={images.logout} />
        <DrawerItem
          label="Đăng xuất"
          onPress={() => dispatch(signOut())}
          labelStyle={styles.label}
        />
      </View>
    </DrawerContentScrollView>
  );
}
export default DrawerCustom;
