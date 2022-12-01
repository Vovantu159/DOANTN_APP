import React, {useEffect, useCallback, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeLink} from '../../redux/reducers/handeNotifiSlice';
import {LeftArrowIcon} from '../../assets/svg/Svg';
import {goBack} from '../../navigation/navigationService';
import {Header} from '../../components';
import NotifiItem from './Item/NotifiItem';
import {listMail} from './data';
import {verticalScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
import {useFocusEffect} from '@react-navigation/native';
import {getNotification} from './Helper/Function';
const renderLeft = () => <LeftArrowIcon />;
export default function Notification(props) {
  const dispatch = useDispatch();
  const token = useSelector(
    (state) => state.authReducer.currentUser?.accessToken,
  );
  const [listNotification, setListNotification] = useState([]);
  useEffect(() => {
    dispatch(removeLink());
    return () => {
      // cleanup
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderNotifi = ({item, index}) => {
    return <NotifiItem item={item} index={index} />;
  };
  const getData = useCallback(() => {
    getNotification(token).then((res) => {
      if (res.status === 200) {
        console.log('Check', res.resJSON.data.data);
        setListNotification(res.resJSON.data.data);
      }
    });
  }, [token]);

  useFocusEffect(
    React.useCallback(() => {
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <View style={styles.container}>
      <Header renderLeft={renderLeft} title="Thông báo" onPressLeft={goBack} />
      <View style={styles.content}>
        <FlatList
          contentContainerStyle={{
            marginTop: verticalScale(10),
          }}
          showsVerticalScrollIndicator={false}
          data={listNotification}
          renderItem={renderNotifi}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  trash: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {flex: 1},
});
