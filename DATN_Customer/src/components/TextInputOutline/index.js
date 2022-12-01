import React from 'react';
import {TextInput} from 'react-native-paper';
import {styles} from './styles';
import PropTypes from 'prop-types';
import {colors} from '../../theme/colors';
export default function Index(props) {
  const {
    label,
    placeholder,
    renderLeft,
    renderRight,
    value,
    onChangeText,
    style,
    selectionColor,
    focusBorderColor,
    editable,
    rest,
    keyboardType,
    secureTextEntry,
  } = props;
  return (
    <TextInput
      {...rest}
      mode="outlined"
      style={[styles.inputContainerStyle, style]}
      label={label}
      placeholder={placeholder}
      editable={editable}
      value={value}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onChangeText={(outlinedLargeText) => onChangeText(outlinedLargeText)}
      left={renderLeft}
      right={renderRight}
      underlineColor="red"
      selectionColor={selectionColor}
      clearTextOnFocus={true}
      theme={{
        colors: {
          primary: focusBorderColor,
        },
      }}
    />
  );
}
Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  onChangeText: PropTypes.func,
  selectionColor: PropTypes.string,
  focusBorderColor: PropTypes.string,
  value: PropTypes.string,
  editable: PropTypes.bool,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};
Index.defaultProps = {
  style: {},
  label: 'Label',
  placeholder: '',
  renderLeft: () => {},
  renderRight: () => {},
  onChangeText: () => {},
  selectionColor: colors.green_background,
  focusBorderColor: colors.green_background,
  value: '',
  editable: true,
  keyboardType: 'default',
  secureTextEntry: false,
};
