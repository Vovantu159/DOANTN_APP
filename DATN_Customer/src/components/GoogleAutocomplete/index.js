import React, {Component} from 'react';
import {View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {styles} from './styles';
import PropTypes from 'prop-types';
const googleAutoKey = 'AIzaSyA77KFyvCAknbrjhTh1JUXIxOR7gDh7fC0';
const myApiKey = 'AIzaSyDFWa-0NcyAk0VaZCRc2v4IcctBcr8g5R4';
export default function GoogleAutoSearch(props) {
  const {
    textInputContainer,
    textInput,
    row,
    listView,
    placeholder,
    onFocusInput,
    onPress,
    ...rest
  } = props;
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      textInputProps={{
        onFocus: () => onFocusInput(),
        keyboardType: 'default',
      }}
      query={{
        key: myApiKey,
        language: 'vi',
        types: 'geocode', // default: 'geocode'
        components: 'country:vn',
      }}
      onPress={onPress}
      minLength={1} // minimum length of text to search
      returnKeyType="search"
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails
      renderDescription={(row) => row.description}
      nearbyPlacesAPI="GooglePlacesSearch"
      GooglePlacesSearchQuery={{
        rankby: 'distance',
        types: 'geocode',
      }}
      styles={{
        textInputContainer: [styles.textInputContainer, textInputContainer],
        container: {},
        textInput: [styles.textInput, textInput],
        row: [styles.row, row],
        poweredContainer: {display: 'flex'},
        listView: [styles.listView, listView],
      }}
      filterReverseGeocodingByTypes={[
        'locality',
        'administrative_area_level_1',
      ]}
      {...rest}
    />
  );
}
GoogleAutoSearch.propTypes = {
  textInputContainer: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textInput: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  row: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  listView: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholder: PropTypes.string,
  onFocusInput: PropTypes.func,
  onPress: PropTypes.func,
};
GoogleAutoSearch.defaultProps = {
  textInputContainer: {},
  textInput: {},
  row: {},
  listView: {},
  placeholder: 'Nhập địa chỉ',
  onFocusInput: () => {},
  onPress: (data, details = null) => {
    console.log(data, details);
  },
};
