import notifee from '@notifee/react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

/** ### backgroundMessageHandler
 * > #### 용도
 * > - FCM 이벤트에 대한 Handler
 * > - Ios, Android 별 이벤트 처리 후 notifee.displayNotification 메소드 통해서
 */
export const backgroundMessageHandler = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Required for iOS
  // See https://notifee.app/react-native/docs/ios/permissions
  await notifee.requestPermission();

  return notifee.displayNotification({
    title: message.notification?.title,
    body: message.notification?.body,
    data: message.data,
    android: {
      channelId,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
};
