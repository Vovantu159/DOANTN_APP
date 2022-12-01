import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {Text, Header} from '../../../components';
import {scale, verticalScale} from 'react-native-size-matters';
import {styles} from '../styles';
import {RateStarIcon, PointIcon, RankIcon} from '../../../assets/svg/Svg';
import {colors} from '../../../theme/colors';
import Images from '../../../assets/images';
export default function Info(props) {
  return (
    <View style={{backgroundColor: colors.white_background}}>
      <View style={styles.avatar}>
        <Image source={Images.img.avata} />
      </View>
      <View style={styles.info}>
        <Text fontSize={scale(20)}>Vo Van Tu</Text>
        <Text fontSize={scale(16)} style={styles.textNumber}>
          0919162943
        </Text>
        <View style={styles.ranking}>
          <RateStarIcon />
          <Text style={styles.textRanking}>4.9</Text>
          <PointIcon />
          <Text style={styles.textRanking}>509 điểm</Text>
          <RankIcon />
          <Text style={styles.textRanking}>Bạch kim</Text>
        </View>
      </View>
    </View>
  );
}
