import React from 'react';
import messaging from '@react-native-firebase/messaging';
import {useNotificationStore} from './useNotificationStore';
import {showToast} from '../lib/showToast';

/** ### useForegroundNotification()
 * #### 사용용도
 * - 어플이 켜진 상태에서 fcm 메시지를 탐지하는 Hook
 * #### 사용방법
 * - App 컴포넌트에 커스텀 훅 적용
 * ```typescript
 * const App = () => {
 *   useForegroundNotification();
 *   return(
 *    <Container />
 *   )
 * }
 * ```
 */
export function useForegroundNotification() {
  const {setHasOnMessage} = useNotificationStore();
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // 테스트용으로 배포시 제거
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const body = remoteMessage.notification?.body;
      const title = remoteMessage.notification?.title;
      // header 알람 종모양 뱃지 활성화
      setHasOnMessage(true);
      // show toast
      showToast({body, title});
      console.log('remoteMessage', remoteMessage);
    });
    return unsubscribe;
  });
}
