import React from 'react';
import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';
import {useMainNavigate} from '~/shared/route';
import {ChattingRoomCard} from 'entities/chatting/chattingRoomCard';
import {useFetchChattingRoomList} from '../model/useFetchChattingRoomList';
import {LoadingPageSpinner} from '~/shared/ui';

// interface ChattingRoomListProps {
//   chatRoomFilterType: ChatFilterType;
// }
interface ChattingRoomListProps {
  chatRoomType: string;
}

export const ChattingRoomList = ({chatRoomType}: ChattingRoomListProps) => {
  const {navigateDetailChattingRoom} = useMainNavigate();

  const {isFetching, isError, data} = useFetchChattingRoomList(chatRoomType);

  if (isError) {
    return <Text>작동안함</Text>;
  }

  if (isFetching) {
    return <LoadingPageSpinner />;
  }

  return (
    <StyledContainer>
      <StyledListContainer>
        {data &&
          data.map(room => (
            <ChattingRoomCard key={`${room.chatRoomName}-${room.chatRoomId}`} onPress={() => navigateDetailChattingRoom(room)} {...room} />
          ))}
      </StyledListContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const StyledListContainer = styled.ScrollView`
  flex: 1;
`;
