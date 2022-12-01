import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  ScaleAnimation,
} from 'react-native-modals';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {styles} from './styles';
import PropTypes from 'prop-types';
export default function PickTime(props) {
  const {
    scaleAnimationModal,
    date,
    time,
    mode,
    onDateChange,
    closeModal,
    onCancel,
    onPickDate,
    onPickTime,
  } = props;
  return (
    <Modal
      onTouchOutside={() => closeModal()}
      width={0.9}
      height={400}
      visible={scaleAnimationModal}
      onSwipeOut={() => closeModal()}
      modalAnimation={new ScaleAnimation()}
      onHardwareBackPress={() => {
        closeModal();
        return true;
      }}
      footer={
        <ModalFooter>
          <ModalButton
            text="Xác nhận"
            bordered
            onPress={() => {
              closeModal();
            }}
            key="button-1"
          />
          <ModalButton
            text="Huỷ"
            bordered
            onPress={() => {
              onCancel();
              closeModal();
            }}
            key="button-2"
          />
        </ModalFooter>
      }
      modalTitle={<ModalTitle title="Example" hasTitleBar={true} />}
      actions={[
        <ModalButton
          text="DISMISS"
          onPress={() => {
            closeModal();
          }}
          key="button-1"
        />,
      ]}>
      <ModalContent style={styles.modalContent}>
        <View style={styles.topContent}>
          <DatePicker
            style={{height: 200}}
            date={mode ? (date === null ? new Date() : date) : time}
            // onDateChange={mode ? setDate : setTime}
            onDateChange={(value) => {
              onDateChange(value);
            }}
            mode={mode ? 'date' : 'time'}
            androidVariant="iosClone"
          />
        </View>
        <View style={styles.footerContent}>
          <TouchableOpacity style={styles.buttonPick} onPress={onPickDate}>
            <Text style={{color: mode ? 'red' : 'black'}}>
              Pick Date: {moment(date).format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPick} onPress={onPickTime}>
            <Text style={{color: mode ? 'black' : 'red'}}>
              Pick Time: {moment(time).format('h:mm:ss a')}
            </Text>
          </TouchableOpacity>
        </View>
      </ModalContent>
    </Modal>
  );
}
PickTime.propTypes = {
  scaleAnimationModal: PropTypes.bool,
  date: PropTypes.any,
  time: PropTypes.any,
  mode: PropTypes.bool,
  onDateChange: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  onCancel: PropTypes.func,
  onPickDate: PropTypes.func,
  onPickTime: PropTypes.func,
};
PickTime.defaultProps = {
  scaleAnimationModal: false,
  date: null,
  time: null,
  mode: true, // true = "date", false ="time"
  onDateChange: () => {},
  openModal: () => {},
  closeModal: () => {},
  onCancel: () => {},
  onPickDate: () => {},
  onPickTime: () => {},
};
/*Example in file App.js*/
