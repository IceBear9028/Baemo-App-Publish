import React from 'react';
import notifee, {EventType} from '@notifee/react-native';
import {Linking} from 'react-native';

// 24.11.24 딥링크 v2 완성에 따라 미사용
export function useBackgroundNotification() {
  React.useEffect(() => {
    return notifee.onBackgroundEvent(async ({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          break;
        case EventType.PRESS:
          const {data}: any = detail.notification;
          const {domain, domainId} = data;
          await Linking.openURL(`baemo://${domain}/${domainId}`);
          break;
      }
    });
  });
}
