/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import moment from 'moment';
import {Header} from '../../components';
import {styles} from './styles';
import {Car, Dollar1, Drawer} from '../../assets/svg/Svg';
import {useSelector} from 'react-redux';
import ItemHistory from './Item';
import MyCalender from './Item/Clander';
import {calculatorIncome, getHistoryList} from './Helper/Function';
import {colors} from '../../theme/colors';
const renderLeft = () => {
  return <Drawer />;
};
export default function History({props, navigation}) {
  const dateNow = new Date();
  const token = useSelector((state) => state.auth.currentUser.token);
  // console.log(token);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(3);
  const [fromDate, setFromDate] = useState(
    moment(dateNow).clone().startOf('month').format('YYYY-MM-DD'), // ngay dau tien thang
  );
  const [toDate, setToDate] = useState(
    moment(dateNow).clone().endOf('month').format('YYYY-MM-DD'), // ngay cuoi cung thang
  );
  const renderItem = useCallback(({item, index}) => {
    return <ItemHistory index={index} item={item} />;
  }, []);

  useEffect(() => {
    setLoading(true);
    getHistoryList(token, fromDate, toDate, status).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        console.log('list', res.resJson.data);
        setList(res.resJson.data);
      }
    });
  }, [fromDate, status, toDate, token]);
  const selectDate = useCallback((value) => {
    // console.log(moment(value).format('YYYY-MM-DD'));
    setFromDate(moment(value).format('YYYY-MM-DD'));
    setToDate(moment(value).format('YYYY-MM-DD'));
  }, []);
  return (
    <View style={styles.container}>
      <Header
        renderLeft={renderLeft}
        onPressLeft={() => {
          navigation.goBack();
        }}
        title="Lịch sử chuyến đi"
      />
      <View style={styles.datePicker}>
        <MyCalender onDateSelected={(value) => selectDate(value)} />
      </View>

      <View style={styles.content}>
        <View style={styles.top}>
          <View
            pointerEvents="none"
            style={[styles.btnTop, {backgroundColor: '#45BA3A'}]}>
            <Car />
            <View style={{marginLeft: 15}}>
              <Text style={styles.txt1}>Số chuyến</Text>
              <Text style={styles.txt2}>{list.length}</Text>
            </View>
          </View>
          <View
            pointerEvents="none"
            style={[styles.btnTop, {backgroundColor: '#25824A'}]}>
            <Dollar1 />
            <View style={{marginLeft: 5}}>
              <Text style={styles.txt1}>Thu nhập</Text>
              <Text numberOfLines={1} style={[styles.txt2, {marginRight: 5}]}>
                {calculatorIncome(list)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}{' '}
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <ActivityIndicator
            animating={loading}
            size="small"
            color={colors.greenOpacity}
          />
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
              marginTop: 20,
            }}
            data={list}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      </View>
    </View>
  );
}
