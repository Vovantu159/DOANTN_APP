import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {colors} from '../../theme/colors.js';
import PropTypes from 'prop-types';
import {styles} from './styles';
export default function Index(props) {
  const {
    style,
    title,
    onPress,
    titleColor,
    disabled,
    titleFontsize,
    ...rest
  } = props;
  return (
    <TouchableOpacity
      {...rest}
      disabled={disabled}
      style={[styles.container, style]}
      onPress={onPress}>
      <Text style={{color: titleColor, fontSize: titleFontsize}}>{title}</Text>
    </TouchableOpacity>
  );
}
Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  onPress: PropTypes.func,
  titleColor: PropTypes.string,
  disabled: PropTypes.bool,
  titleFontsize: PropTypes.number,
};

Index.defaultProps = {
  style: {},
  title: 'Button',
  onPress: () => {},
  titleColor: colors.white_background,
  disabled: false,
  titleFontsize: 20,
};
