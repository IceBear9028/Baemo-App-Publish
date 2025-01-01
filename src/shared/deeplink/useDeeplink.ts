import {useEffect, useRef} from 'react';
import {Linking} from 'react-native';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import {DeeplinkManager, deeplinkUrlConverter} from '~/shared/deeplink/util/deeplinkUtils.ts';

export const useDeeplink = () => {
  const deeplinkManager = useRef(new DeeplinkManager()).current;

  // 딥링크 URL 처리 로직
  const processDeeplink = (data: {domain?: string; headerTitle?: string; id?: string | number}, source: string) => {
    const {domain, headerTitle, id} = data || {};
    if (domain) {
      const pageUrl = deeplinkUrlConverter(domain.toString(), headerTitle?.toString(), Number(id));
      console.log(`[${source}] Handling deep link:`, pageUrl);
      deeplinkManager.handleDeeplink(pageUrl, source);
    }
  };

  // Firebase Notification 처리
  useEffect(() => {
    const handleInitialNotification = async () => {
      const initialNotification = await messaging().getInitialNotification();
      if (initialNotification?.data) {
        console.log('[App Launched by Notification]', initialNotification.data);
        processDeeplink(initialNotification.data, 'Firebase (Initial Notification)');
      }
    };

    const handleNotificationOpened = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      if (remoteMessage?.data) {
        console.log('[App Opened from Background by Notification]', remoteMessage.data);
        processDeeplink(remoteMessage.data, 'Firebase (Notification Opened)');
      }
    };

    const handleForegroundMessage = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('[Foreground Notification Received]', remoteMessage.notification);
      Toast.show({
        type: 'info',
        text1: remoteMessage.notification?.title || '알림',
        text2: remoteMessage.notification?.body || '새로운 알림이 도착했습니다.',
        visibilityTime: 5000,
        onPress: () => {
          Toast.hide();
          if (remoteMessage?.data) {
            console.log('[Notification Clicked in Foreground]', remoteMessage.data);
            processDeeplink(remoteMessage.data, 'Firebase (Foreground Notification)');
          }
        },
      });
    };

    const unsubscribeNotificationOpened = messaging().onNotificationOpenedApp(handleNotificationOpened);
    const unsubscribeForegroundMessage = messaging().onMessage(handleForegroundMessage);

    handleInitialNotification();

    return () => {
      unsubscribeNotificationOpened();
      unsubscribeForegroundMessage();
    };
  }, [deeplinkManager.lastHandledUrl]);

  // Linking 처리
  useEffect(() => {
    const handleInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        console.log('[App Launched by Deep Link]', initialUrl);
        deeplinkManager.handleDeeplink(initialUrl, 'Linking.getInitialURL');
      }
    };

    const handleLinkingEvent = (event: {url: string}) => {
      console.log('[Linking Event]', event.url);
      deeplinkManager.handleDeeplink(event.url, 'Linking.addListener');
    };

    const linkingSubscription = Linking.addListener('url', handleLinkingEvent);

    handleInitialURL();

    return () => {
      linkingSubscription.remove();
    };
  }, [deeplinkManager.lastHandledUrl]);
};
