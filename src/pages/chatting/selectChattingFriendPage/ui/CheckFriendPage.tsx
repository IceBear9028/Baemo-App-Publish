import React from 'react';
import {Text} from '@gluestack-ui/themed';
import {LoadingPageSpinner} from '~/shared/ui';
import {useFetchFriendList} from '../model/useFetchFriendList';
import styled from 'styled-components/native';
import {MyFriendListBoard} from '~/widgets/chatting/MyFriendListBoard';

export const CheckFriendPage = () => {
  const {isFetching, isError, data} = useFetchFriendList();

  if (isError) {
    return <Text>에러에</Text>;
  }

  if (isFetching) {
    return <LoadingPageSpinner />;
  }

  return (
    <StyledContainer>
      <StyledListContainer>
        <MyFriendListBoard friends={data || []} />
      </StyledListContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const StyledListContainer = styled.View`
  flex: 1;
`;
