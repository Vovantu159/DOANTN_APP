import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Drawer, NotiService, Close, CheckSucces} from '../../assets/svg/Svg';
import {Header} from '../../components';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {getNotificationList} from './Helper/Function';
const data = [
  // {
  //   id: 1,
  //   title: 'Đơn giao thành công',
  //   content:
  //     'Đơn hàng 6687 đã được giao thành công giao thành công giao thành công',
  //   status: 1,
  // },
  // {
  //   id: 2,
  //   title: 'Thông báo cập nhật',
  //   content: 'Hệ thống sẽ cập nhật lúc 00:00 ngày 05/11/2022',
  //   status: 2,
  // },
  // {
  //   id: 3,
  //   title: 'Đơn đã bị huỷ',
  //   content: 'Đơn hàng 6687 đã huỷ do quá thời gian giao hàng',
  //   status: 0,
  // },
];
export default function Notification({props, navigation}) {
  const token = useSelector((state) => state.auth.currentUser?.token);
  console.log(token);
  const renderLeft = () => <Drawer />;
  const renderItem = ({item, index}) => (
    <View style={styles.item}>
      <View pointerEvents="none" style={styles.iconItem}>
        {item.status === 1 ? (
          <CheckSucces />
        ) : item.status === 0 ? (
          <Close />
        ) : (
          <NotiService />
        )}
      </View>
      <View style={{marginLeft: 10, flex: 1}}>
        <Text numberOfLines={1} style={styles.titleItem}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.contentItem}>
          {item.content}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        renderLeft={renderLeft}
        onPressLeft={() => {
          navigation.goBack();
        }}
        title="Thông báo"
      />
      <View style={styles.content}>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    </View>
  );
}
