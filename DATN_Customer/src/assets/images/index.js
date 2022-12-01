import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
import {colors} from '../../theme/colors';
const Images = {
  img: {
    ecommerce1: require('./ecommerce1.png'),
    ecommerce2: require('./ecommerce2.png'),
    ecommerce3: require('./ecommerce3.png'),
    //
    avata: require('./avata.png'),
    doraemon: require('./doraemon.png'),
    otp: require('./otp.png'),
    drawerbg: require('./drawerImage.png'),
    logo: require('./LOGO-DAWN.png'),
    goldMember: require('./goldmeber.png'),
    logout: require('./logout.png'),
    greenMarker: require('./greenMarker.png'),
  },
  icons: {
    leftArrow: (
      <AntDesign name="right" size={24} color={colors.white_background} />
    ),
    rightArrow: (
      <AntDesign name="left" size={24} color={colors.white_background} />
    ),
    rightArrowBlack: <AntDesign name="left" size={24} color={colors.black} />,
    next: <AntDesign name="right" size={24} color={colors.black} />,
    menu: <Feather name="menu" size={28} color={colors.green_background} />,
  },
};

export default Images;
