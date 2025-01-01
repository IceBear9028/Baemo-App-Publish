import React from 'react';
import styled from 'styled-components/native';
import {MyProfileCard} from '~/features/profile/myProfileCard';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopTabBarConfig} from '~/shared/config';
import {MyExerciseList} from '~/widgets/profile/myExercise';
import {FriendListBoard} from '~/widgets/chatting/FriendListBoard';
import {BlockFriendList} from '~/widgets/profile/myBlock';
import {MyRequestFriend} from '~/widgets/profile/requestFriend';

type MyProfileTabBarRoute = {
  myExercise: undefined;
  myArticle: undefined;
  myFriend: undefined;
  myBlock: undefined;
  myRequestFriend: undefined;
};

const Tab = createMaterialTopTabNavigator<MyProfileTabBarRoute>();

export const MainProfilePage = () => {
  return (
    <StyledContainer>
      <Container>
        <MyProfileCard />
        <Tab.Navigator>
          <Tab.Screen name={'myExercise'} component={MyExerciseList} options={() => TopTabBarConfig('완료된 운동')} />
          <Tab.Screen name={'myFriend'} component={FriendListBoard} options={() => TopTabBarConfig('내 친구')} />
          <Tab.Screen name={'myBlock'} component={BlockFriendList} options={() => TopTabBarConfig('내 차단')} />
          <Tab.Screen name={'myRequestFriend'} component={MyRequestFriend} options={() => TopTabBarConfig('친구 요청')} />
        </Tab.Navigator>
      </Container>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;
