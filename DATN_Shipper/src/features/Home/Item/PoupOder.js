import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  NativeModules,
  Image,
} from 'react-native';
import {StartLocation, DashSvg, Marker} from '../../../assets/svg/Svg';
const {StatusBarManager} = NativeModules;
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import images from '../../../assets/images';
import {colors} from '../../../theme/colors';
import {Button} from '../../../components';
const PoupOder = forwardRef((props, ref) => {
  console.log('Re-render poup mode');
  const {onClose} = props;
  const [isShow, setIsShow] = useState(true);
  useImperativeHandle(ref, () => ({
    showModal,
    closeModal,
  }));
  const showModal = () => setIsShow(true);
  const closeModal = () => {
    setIsShow(false);
  };
  return (
    <View ref={ref}>
      <Modal
        backdropColor="transparent"
        isVisible={isShow}
        customBackdrop={
          <TouchableWithoutFeedback
            onPress={() => {
              setIsShow(false);
            }}>
            <View>
              <View />
              <View style={styles.backDrops} />
            </View>
          </TouchableWithoutFeedback>
        }>
        <View style={styles.modal}>
          <View style={styles.info}>
            <Image style={styles.avt} source={images.avatar} />
            <View style={{alignSelf: 'center', marginLeft: 10}}>
              <Text style={styles.txt1}>Cửa hàng Nho Xanh</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.btn1}>
                  <Text style={styles.txt2}>Tiền mặt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn1}>
                  <Text style={styles.txt2}>Ưu đãi</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{alignSelf: 'center', alignItems: 'flex-end', flex: 1}}>
              <Text style={styles.txt3}>97.347 vnđ</Text>
              <Text style={styles.txt4}>9,5 km</Text>
            </View>
          </View>
          <View style={styles.location}>
            <View style={styles.base1}>
              <View pointerEvents="none">
                <StartLocation />
              </View>
              <View style={{marginLeft: 15}}>
                <Text style={styles.txt5}>Nhận hàng</Text>
                <Text style={styles.txt6}>
                  {' '}
                  131, Trần Phú, Văn Quán, Hà Đông
                </Text>
              </View>
            </View>
            <View style={styles.dash} pointerEvents="none">
              <DashSvg />
            </View>
            <View style={styles.base1}>
              <View pointerEvents="none">
                <Marker />
              </View>
              <View style={{marginLeft: 15}}>
                <Text style={styles.txt5}>Giao hàng</Text>
                <Text style={styles.txt6}>
                  131, Nguyễn Phong Sắc, Cầu Giấy, Hà Nội
                </Text>
              </View>
            </View>
            <View style={styles.footer}>
              <Button
                onPress={() => {
                  ref.current.closeModal();
                }}
                style={styles.btn2}
                title="Từ chối"
                titleFontsize={16}
              />
              <Button
                onPress={() => {
                  onClose();
                  ref.current.closeModal();
                }}
                style={styles.btn3}
                title="Nhận đơn"
                titleFontsize={16}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
});
const Sc_Width = Dimensions.get('window').width;
const Sc_Height = Dimensions.get('window').height;
const STATUSBAR_HEIGHT = StatusBarManager.HEIGHT;

const heighHeaderBackdrop =
  Platform.OS === 'android' ? 50 : 50 + STATUSBAR_HEIGHT;
const styles = StyleSheet.create({
  modal: {
    width: Sc_Width * 0.95,
    minHeight: Sc_Height * 0.45,
    bottom: 0,
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignSelf: 'center',
  },
  backDrops: {
    height: Sc_Height,
    marginTop: heighHeaderBackdrop,
  },
  info: {
    flex: 1.5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#F7F7F7',
  },
  location: {
    flex: 3,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#F7F7F7',
    borderTopWidth: 1,
    marginTop: 10,
  },
  avt: {
    height: 44,
    width: 44,
    alignSelf: 'center',
    borderRadius: 5,
  },
  txt1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  btn1: {
    height: 22,
    width: 60,
    backgroundColor: '#FDBB2F',
    marginHorizontal: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt2: {
    fontSize: 12,
  },
  txt3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.green_background,
  },
  txt4: {
    color: '#D8D8D8',
  },
  dash: {
    paddingLeft: 16,
  },
  txt5: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '800',
    color: '#CFD8DC',
  },
  txt6: {
    marginTop: 5,
  },
  btn2: {
    width: '40%',
    backgroundColor: '#F44336',
    marginHorizontal: '5%',
    height: 40,
  },
  btn3: {
    width: '40%',
    backgroundColor: colors.green_background,
    marginHorizontal: '5%',
    height: 40,
  },
  base1: {
    flexDirection: 'row',
    paddingLeft: 10,
    height: 50,
    alignItems: 'center',
  },
});
export default React.memo(PoupOder);
