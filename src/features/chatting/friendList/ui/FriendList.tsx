import styled from 'styled-components/native';
import {useFetchGetFriendList} from '../model/useFetchGetFriendList.ts';
import {Text} from '@gluestack-ui/themed';
import {ChattingFriendCard} from '~/entities/chatting/chattingFriendCard';
import {LoadingPageSpinner} from '~/shared/ui';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

export const FriendList = ({searchFriend}: {searchFriend: string}) => {
  const {isError, data} = useFetchGetFriendList();
  // useFocusEffect(
  //   useCallback(() => {
  //     refetch();
  //   }, [refetch]),
  // );

  if (isError) {
    return <Text>문제가 발생했습니다.</Text>;
  }

  if (data && data.length <= 0) {
    return (
      <StyledFallback>
        <Text>내 친구가 없습니다.</Text>
      </StyledFallback>
    );
  }

  const filteredFriends = data?.filter(friend => friend?.userName && friend.userName.includes(searchFriend));

  return (
    <StyledContainer>
      {filteredFriends &&
        filteredFriends.map((friend, index) => <ChattingFriendCard key={`${index}-${friend.userName}`} {...friend} isMyFriend={true} />)}
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
