import messaging from '@react-native-firebase/messaging';
// import notifee from '@notifee/react-native';

export function initNotification() {
  // const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log(remoteMessage);
  // });
  // return unsubscribe
}

export function subcribeTopic(topicId) {
  messaging()
    .subscribeToTopic(topicId)
    .then(() => {
      console.log(`Subscribed to topic ${topicId}!`);
      // messaging().console.log(`Subscribed to topic ${topicId}!`);
    });
}
export function unsubcribeTopic(topicId) {
  messaging()
    .unsubscribeFromTopic(topicId)
    .then(() => console.log(`unsubscribed to topic ${topicId}!`));
}
export function getMessage() {
  messaging().onMessage(async (remoteMessage) => {
    console.log(remoteMessage);
    onReceiveNotification(remoteMessage);
  });
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log(remoteMessage);
  });
}

const onReceiveNotification = (message) => {
  onDisplayNotification(message);
};

const onDisplayNotification = async (message) => {
  // Create a channel
  // const channelId = await notifee.createChannel({
  //   id: 'ASP APP',
  //   name: 'Công ty cổ phần dầu khí ASP',
  // });
  // // Display a notification
  // await notifee.displayNotification({
  //   title: message.notification.title,
  //   body: message.notification.body,
  //   android: {
  //     channelId,
  //   },
  // });
};
