import React from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import Modal, {ModalContent, SlideAnimation} from 'react-native-modals';
import {colors} from '../../theme/colors';
import PropTypes from 'prop-types';
import {lotties} from '../../assets/lottie';

export default function Loading(props) {
  const {loading} = props;
  return (
    <Modal
      onDismiss={() => {}}
      onTouchOutside={() => {}}
      swipeDirection="down"
      onSwipeOut={() => this.setState({slideAnimationModal: false})}
      visible={loading}
      modalAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
      <ModalContent style={styles.content}>
        <LottieView source={lotties.loading} autoPlay loop />
      </ModalContent>
    </Modal>
  );
}
Loading.propTypes = {
  loading: PropTypes.bool,
};
Loading.defaultProps = {
  loading: false,
};
const styles = StyleSheet.create({
  content: {
    height: 80,
    width: 80,
    backgroundColor: colors.white_background,
  },
});
