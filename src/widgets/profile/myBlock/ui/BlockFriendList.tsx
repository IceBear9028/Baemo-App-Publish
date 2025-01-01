import styled from 'styled-components/native';
import {useRefreshMyBlockFriendList} from '~/widgets/profile/myBlock/model/useRefreshMyBlockFriendList.ts';
import {RefreshControl} from 'react-native';
import React from 'react';
import {MyBlockFriendList} from '~/features/profile/myBlockFriendList';

export const BlockFriendList = () => {
  const {isFetching, refresh} = useRefreshMyBlockFriendList();

  return (
    <StyledContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refresh} />}>
      <MyBlockFriendList />
    </StyledContainer>
  );
};

const StyledContainer = styled.ScrollView`
  margin-bottom: 10px;
`;
