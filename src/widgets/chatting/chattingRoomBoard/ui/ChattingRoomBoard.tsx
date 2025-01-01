import styled from 'styled-components/native';
import React from 'react';
import {ChattingRoomList} from '~/features/chatting/chattingRoomList';
import {RouteProp} from '@react-navigation/native';
import {ChattingTabBarRoute} from '~/pages/chatting/mainChattingPage/ui/ChattingPage.tsx';
import {useRefreshChattingRoomList} from '../model/useRefreshChattingRoomList.ts';
import {RefreshControl} from 'react-native';
import {AddButton, FabButton} from '~/shared/ui';
import {FabIcon} from '@gluestack-ui/themed';
import {useMainNavigate} from '~/shared/route';

type ChattingRoomListProps = {
  route: RouteProp<ChattingTabBarRoute, keyof ChattingTabBarRoute>;
};

export const ChattingRoomBoard = ({route}: ChattingRoomListProps) => {
  const {chatRoomFilterType} = route.params;
  const {isFetching, refreshChattingRoomList} = useRefreshChattingRoomList();
  const {navigateCheckChattingFriend} = useMainNavigate();

  return (
    <Container>
      <StyledContainer
        overScrollMode="never"
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refreshChattingRoomList} />}>
        <ChattingRoomList chatRoomType={chatRoomFilterType} />
      </StyledContainer>
      {chatRoomFilterType === 'ALL' || chatRoomFilterType === 'DM' ? (
        <FabButtonContainer>
          <FabButton icon={<FabIcon as={AddButton} />} title={'채팅'} onPress={() => navigateCheckChattingFriend()} />
        </FabButtonContainer>
      ) : null}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const StyledContainer = styled.ScrollView`
  flex: 1;
  background-color: #f4f4f5;
`;

const FabButtonContainer = styled.View`
  position: absolute;
  bottom: 30px;
  right: 5px;
`;
