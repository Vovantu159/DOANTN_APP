import React, {useState, useRef, useEffect, useCallback} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../theme/colors';
const SearchBar = ({searching, navigation}) => {
  const [value, setValue] = useState('');
  const changingTimeOut = useRef(null);
  const onChangeValue = (e) => {
    if (changingTimeOut.current) {
      clearTimeout(changingTimeOut.current);
    }
    changingTimeOut.current = setTimeout(() => {
      setValue(e);
    }, 200);
  };
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  // useEffect(() => {
  //   searching(value);
  // }, [searching, value]);
  return (
    <View style={styles.container}>
      <View style={styles.backBtn}>
        <AntDesign onPress={goBack} name="arrowleft" size={24} />
      </View>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          onChangeText={onChangeValue}
          clearButtonMode="always"
        />
        <AntDesign name="search1" size={24} onPress={() => searching(value)} />
      </View>
    </View>
  );
};
export default React.memo(SearchBar);
const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.white_background,
    paddingHorizontal: 10,
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  input: {
    flex: 1,
    height: 45,
  },
  backBtn: {
    height: 35,
    width: 35,
    borderRadius: 999,
    backgroundColor: colors.white_background,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
