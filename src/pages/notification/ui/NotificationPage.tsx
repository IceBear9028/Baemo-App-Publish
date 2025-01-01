import React from 'react';
import styled from 'styled-components/native';
import {TopTabBarConfig} from '~/shared/config';
import {RootMainStackParamList} from '~/shared/route';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {UnreadNotificationTab} from '~/pages/notification/ui/UnreadNotificationTab.tsx';
import {AllNotificationTab} from '~/pages/notification/ui/AllNotificationTab.tsx';
import {Deeplink} from '~/shared/mapper/notification/lib/notificationList.ts';

export type DeepLinkProps = {} & NativeStackScreenProps<RootMainStackParamList, 'notificationPage'>;

export type NotificationPageTabRoute = {
  unreadNotification: Deeplink;
  allNotification: Deeplink;
};

const Tab = createMaterialTopTabNavigator<NotificationPageTabRoute>();

export const NotificationPage = ({route}: DeepLinkProps) => {
  return (
    <StyledContainer>
      <ApiErrorBoundary>
        <Tab.Navigator>
          <Tab.Screen
            name={'unreadNotification'}
            component={UnreadNotificationTab}
            options={() => TopTabBarConfig('안읽은 알림')}
            initialParams={route.params}
          />
          <Tab.Screen
            name={'allNotification'}
            component={AllNotificationTab}
            options={() => TopTabBarConfig('전체 알림')}
            initialParams={route.params}
          />
        </Tab.Navigator>
      </ApiErrorBoundary>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
