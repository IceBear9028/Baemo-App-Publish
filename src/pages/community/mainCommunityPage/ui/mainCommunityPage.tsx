import React from 'react';
import styled from 'styled-components/native';
import {Feed} from '~/widgets/community/feed';
import {TopTabBarConfig} from '~/shared/config';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CommunityCategoryList} from '~/widgets/community/communityCategoryList';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';

type MainCommunityTopBarRoute = {
  feed: undefined;
  communityCategory: undefined;
  hotForum: undefined;
};

const Tab = createMaterialTopTabNavigator<MainCommunityTopBarRoute>();

export const MainCommunityPage = () => {
  return (
    <StyledContainer>
      <ApiErrorBoundary>
        <Tab.Navigator>
          <Tab.Screen name={'feed'} component={Feed as any} options={() => TopTabBarConfig('피드')} />
          <Tab.Screen name={'communityCategory'} component={CommunityCategoryList} options={() => TopTabBarConfig('카테고리')} />
        </Tab.Navigator>
      </ApiErrorBoundary>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  justify-content: space-around;
`;
