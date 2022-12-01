import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {Header} from '../../components';
import {colors} from '../../theme/colors';
import {Back} from '../../assets/svg/Svg';

export default function RoomChat({route, navigation}) {
  const title = route?.params?.thread?.name;
  const {thread} = route.params;
  const [messages, setMessages] = useState([]);
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#FFD428"
          />
        </View>
      </Send>
    );
  };
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#45BA3A',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };
  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  const renderLeft = () => <Back />;

  async function handleSend(messages) {
    const text = messages[0].text;
    firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: 'userDriver',
          email: 'drive@gmail.com',
        },
      });
    await firestore()
      .collection('THREADS')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        {merge: true},
      );
  }
  useEffect(() => {
    const messagesListener = firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => messagesListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Header title={title} renderLeft={renderLeft} onPressLeft={goBack} />
      <GiftedChat
        messages={messages}
        onSend={(newMessage) => handleSend(newMessage)}
        renderSend={renderSend}
        renderBubble={renderBubble}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        placeholder="Nội dung ..."
        user={{
          _id: 'userDriver',
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white_background},
});
