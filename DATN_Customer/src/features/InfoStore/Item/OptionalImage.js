import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ModalContent, BottomModal} from 'react-native-modals';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {colors} from '../../../theme/colors';

export default function OptionalModal(props) {
  const {isModal, close, selectImage, openCamera} = props;
  return (
    <BottomModal
      visible={isModal}
      onTouchOutside={() => close()}
      height={0.2}
      width={1}
      onSwipeOut={() => close()}>
      <ModalContent style={styles.content}>
        <Image
          style={styles.imgTop}
          source={require('../../../assets/images/Shape.png')}
        />
        <TouchableOpacity
          onPress={() => selectImage()}
          style={styles.btnSelectImage}>
          <Fontisto name="photograph" size={24} />
          <Text style={styles.txt}>Chọn ảnh từ thư viện ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openCamera()}
          style={styles.btnOpencamera}>
          <Image
            style={styles.cameraImg}
            source={require('../../../assets/images/camera.png')}
          />
          <Text style={styles.txt}>Chụp ảnh</Text>
        </TouchableOpacity>
      </ModalContent>
    </BottomModal>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  imgTop: {height: 3.5, width: 36, alignSelf: 'center'},
  btnSelectImage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 8,
    marginTop: 15,
  },
  btnOpencamera: {flexDirection: 'row', alignItems: 'center'},
  txt: {marginLeft: 10},
  cameraImg: {width: 40, height: 40},
});
