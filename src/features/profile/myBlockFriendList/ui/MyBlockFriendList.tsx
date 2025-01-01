import styled from 'styled-components/native';
import {useFetchGetBlockFriendList} from '../model/useFetchGetBlockFriendList.ts';
import {Text} from '@gluestack-ui/themed';
import {LoadingPageSpinner} from '~/shared/ui';
import {ChattingFriendCard} from '~/entities/chatting/chattingFriendCard';
import React from 'react';

export const MyBlockFriendList = () => {
  const {isFetching, isError, data} = useFetchGetBlockFriendList();

  if (isError) {
    return <Text>에러발생</Text>;
  }
  if (isFetching) {
    return <LoadingPageSpinner />;
  }

  if (data && data.length <= 0) {
    return (
      <StyledFallback>
        <Text>차단한 친구가 없습니다.</Text>
      </StyledFallback>
    );
  }

  return (
    <StyledContainer>
      {data && data.map(friend => <ChattingFriendCard key={`${friend.userName}`} {...friend} isMyFriend={false} />)}
    </StyledContainer>
  );
};

const StyledContainer = styled.ScrollView`
  margin-bottom: 10px;
`;

const StyledFallback = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;
