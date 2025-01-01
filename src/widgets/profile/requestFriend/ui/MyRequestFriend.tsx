import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';
import React from 'react';
import {MyRequestFriendList} from '~/features/profile/myRequestFriendList';
import {useRefreshMyRequestFriendList} from '../model/useRefreshMyRequestFriendList.ts';

export const MyRequestFriend = () => {
  const {isFetching, refresh} = useRefreshMyRequestFriendList();

  return (
    <StyledContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refresh} />}>
      <MyRequestFriendList />
    </StyledContainer>
  );
};

const StyledContainer = styled.ScrollView`
  flex: 1;
`;
