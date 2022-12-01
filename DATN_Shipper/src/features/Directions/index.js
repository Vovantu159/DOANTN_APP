import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Header, MyMap, LiveMapDirection} from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../theme/colors';
export default function Directions({props, navigation}) {
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const renderLeft = () => {
    return <AntDesign name="arrowleft" size={24} />;
  };
  return (
    <View style={styles.container}>
      <Header renderLeft={renderLeft} onPressLeft={goBack} title="Chỉ đường" />
      <View style={{flex: 1}}>
        {/* <MyMap isDirection={true} /> */}
        <LiveMapDirection />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white_background},
  back: {marginTop: 5, marginLeft: 20},
});
