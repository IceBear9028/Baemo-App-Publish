import styled from 'styled-components/native';
import React, {Fragment} from 'react';
import {RequestFriendCard} from '~/entities/profile';
import {useFetchGetRequestFriendList} from '../model/useFetchGetRequestFriendList.ts';
import {Text} from '@gluestack-ui/themed';
import {LoadingPageSpinner} from '~/shared/ui';

export const MyRequestFriendList = () => {
  const {isFetching, isError, data} = useFetchGetRequestFriendList();

  if (isError) {
    return <Text>문제가 발생했습니다.</Text>;
  }
  if (isFetching) {
    return <LoadingPageSpinner />;
  }

  if (data && data.length <= 0) {
    return (
      <StyledFallback>
        <Text>친구 요청 정보가 없습니다.</Text>
      </StyledFallback>
    );
  }

  return <StyledContainer>{data && data.map(friend => <RequestFriendCard key={`${friend.userName}`} {...friend} />)}</StyledContainer>;
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
