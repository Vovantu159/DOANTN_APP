import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {SC_WIDTH} from '../../constants/SizeScreen';
import {verticalScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';

export default function Index(props) {
  const {callBack, menuSelected} = props;
  const [dataMenu, setDataMenu] = useState(data);
  const updateOnPress = (index) => {
    const categories = dataMenu.map((item) => {
      item.selected = false;
      return item;
    });
    categories[index].selected = true;
    setDataMenu(categories);
  };
  useEffect(() => {
    if (menuSelected === 1) {
      setDataMenu([
        {
          id: 1,
          tilte: 'Chờ xác nhận',
          selected: true,
        },
        {
          id: 2,
          tilte: 'Đang giao',
          selected: false,
        },
        {
          id: 3,
          tilte: 'Đã giao',
          selected: false,
        },
        {
          id: 4,
          tilte: 'Đã huỷ',
          selected: false,
        },
      ]);
    }
  }, [menuSelected]);
  const renderMenu = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          updateOnPress(index);
          callBack(item.id);
        }}
        style={[
          styles.item,
          // eslint-disable-next-line react-native/no-inline-styles
          {borderBottomColor: item.selected ? colors.redColor : 'transparent'},
        ]}>
        <Text style={styles.txtTitle}>{item.tilte}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        style={{
          marginTop: -verticalScale(35),
        }}
        contentContainerStyle={{height: verticalScale(35)}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={dataMenu}
        renderItem={renderMenu}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    height: verticalScale(35),
    width: SC_WIDTH / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingLeft: 2,
  },
  txtTitle: {
    fontSize: 16,
    color: colors.white_background,
  },
});
const data = [
  {
    id: 1,
    tilte: 'Chờ xác nhận',
    selected: true,
  },
  {
    id: 2,
    tilte: 'Đang giao',
    selected: false,
  },
  {
    id: 3,
    tilte: 'Đã giao',
    selected: false,
  },
  {
    id: 4,
    tilte: 'Đã huỷ',
    selected: false,
  },
];
