import styled from 'styled-components/native';
import {FriendList} from '~/features/chatting/friendList';
import {Input, InputField} from '@gluestack-ui/themed';
import {FollowFriendButton} from '~/features/chatting/followFriend';
import React, {useState} from 'react';
import {RefreshControl} from 'react-native';
import {useRefreshMyFriendList} from '../model/useRefreshMyFriendList.ts';

export const FriendListBoard = () => {
  const [searchFriend, setSearchFriend] = useState('');
  const {isFetching, refresh} = useRefreshMyFriendList();

  return (
    <StyledScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refresh} />}>
      <StyledHeader>
        <StyledInputContainer>
          <SearchInput placeholder="검색" placeholderTextColor="#A3A3A3" onChangeText={text => setSearchFriend(text)} />
        </StyledInputContainer>
        {/*<FollowFriendButton />*/}
      </StyledHeader>
      <FriendList searchFriend={searchFriend} />
    </StyledScrollView>
  );
};

const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

const StyledHeader = styled.View`
  padding: 10px 20px;
  gap: 16px;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const StyledInputContainer = styled.View`
  //align-self: stretch;
  flex: 1;
`;

const SearchInput = styled.TextInput`
  height: 40px;
  border-radius: 4px;
  padding-left: 10px;
  background-color: #f5f5f5;
`;
