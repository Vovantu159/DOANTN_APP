import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../theme/colors';
import Header from './item/Header';
import {Wallet} from '../../assets/svg/Svg';
import {styles} from './styles';
import moment from 'moment';
import {calculatorIncome, getHistoryList} from '../History/Helper/Function';
import {useSelector} from 'react-redux';
import {calculatorDistance} from './Helper/Function';
import Spinner from 'react-native-loading-spinner-overlay';
export default function Statics({props, navigation}) {
  const dateNow = new Date();
  const token = useSelector((state) => state.auth.currentUser.token);

  const [startDate, setStartDate] = useState(
    moment(dateNow).startOf('week').isoWeekday(1).format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState(
    moment(dateNow).endOf('week').isoWeekday(7).format('YYYY-MM-DD'),
  );
  const [delivering, setDelivering] = useState(3); // oder completed
  const [status, setStatus] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const onChangeStatus = (e) => {
    if (e === 0) {
      setStatus(true);
      setStartDate(
        moment(dateNow).startOf('week').isoWeekday(1).format('YYYY-MM-DD'),
      );
      setEndDate(
        moment(dateNow).endOf('week').isoWeekday(7).format('YYYY-MM-DD'),
      );
    } else {
      setStatus(false);
      setStartDate(
        moment(dateNow).clone().startOf('month').format('YYYY-MM-DD'),
      );
      setEndDate(moment(dateNow).clone().endOf('month').format('YYYY-MM-DD'));
    }
  };
  useEffect(() => {
    setLoading(true);
    getHistoryList(token, startDate, endDate, delivering).then((res) => {
      console.log('res', res);
      setLoading(false);
      if (res.status === 200) {
        setData(res.resJson.data);
      }
    });
  }, [token, startDate, endDate, delivering]);
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        Status={status}
        onChange={onChangeStatus}
        inCome={calculatorIncome(data)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
      />

      <Spinner visible={loading} textStyle={{color: '#FFF'}} />
      <View style={styles.content}>
        <View style={styles.item}>
          <View>
            <Text style={styles.txt1}>{data.length}</Text>
            <Text style={styles.txt2}>Tổng số chuyến</Text>
          </View>
          <View>
            <Text style={styles.txt1}>
              {calculatorDistance(data).toFixed(2)} km
            </Text>
            <Text style={styles.txt2}>Số km di chuyển</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View>
            <Text style={styles.txt3}>Số dư ví Driver</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View pointerEvents="none">
                <Wallet />
              </View>
              <Text style={styles.txt4}>
                {calculatorIncome(data)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
              </Text>
            </View>
          </View>
          <View style={styles.base}>
            <TouchableOpacity style={styles.btn}>
              <Text
                style={{color: colors.white_background, fontWeight: 'bold'}}>
                $ NẠP THÊM
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <View>
            <Text style={styles.txt3}>Số dư ví Driver</Text>
            <View style={styles.txt5}>
              <View pointerEvents="none">
                <Wallet />
              </View>
              <Text style={styles.txt4}>
                {calculatorIncome(data)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
              </Text>
            </View>
          </View>
          <View style={styles.base}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.txt5}>$ RÚT TIỀN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
