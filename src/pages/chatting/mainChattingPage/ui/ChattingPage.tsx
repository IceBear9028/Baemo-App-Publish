import React from 'react';
import styled from 'styled-components/native';
import {TopTabBarConfig} from '~/shared/config';
import {FriendListBoard} from '~/widgets/chatting/FriendListBoard';
import {ChattingRoomBoard} from '~/widgets/chatting/chattingRoomBoard';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

export type ChattingTabBarRoute = {
  ALL: {chatRoomFilterType: string};
  DM: {chatRoomFilterType: string};
  CLUB: {chatRoomFilterType: string};
  EXERCISE: {chatRoomFilterType: string};
};

const Tab = createMaterialTopTabNavigator<ChattingTabBarRoute>();

export const ChattingPage = () => {
  return (
    <StyledContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={'ALL'}
          component={ChattingRoomBoard}
          initialParams={{chatRoomFilterType: 'ALL'}}
          options={TopTabBarConfig('전체')}
        />
        <Tab.Screen
          name={'DM'}
          component={ChattingRoomBoard}
          initialParams={{chatRoomFilterType: 'DM'}}
          options={TopTabBarConfig('개인')}
        />
        <Tab.Screen
          name={'CLUB'}
          component={ChattingRoomBoard}
          initialParams={{chatRoomFilterType: 'CLUB'}}
          options={TopTabBarConfig('모임')}
        />
        <Tab.Screen
          name={'EXERCISE'}
          component={ChattingRoomBoard}
          initialParams={{chatRoomFilterType: 'EXERCISE'}}
          options={TopTabBarConfig('운동')}
        />
      </Tab.Navigator>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
