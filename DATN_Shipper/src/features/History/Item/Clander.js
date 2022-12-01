import React, {Component} from 'react';
import {View, Text} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {colors} from '../../../theme/colors';
import 'moment/locale/vi';
const locale = {
  name: 'vi',
  config: {
    months: 'Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12'.split(
      '_',
    ),
    monthsShort: 'T1_T2_T3_T4_T5_T6_T7_T8_T9_T10_T11_T12'.split('_'),
    weekdays: 'T2_T3_T4_T5_T6_T7_CN'.split('_'),
  },
};
const MyCalender = ({onDateSelected}) => {
  return (
    <CalendarStrip
      style={{height: 100, paddingTop: 20, paddingBottom: 10}}
      highlightDateNumberStyle={{color: colors.green_background}}
      locale={locale}
      onDateSelected={(value) => onDateSelected(value)}
    />
  );
};
export default React.memo(MyCalender);
