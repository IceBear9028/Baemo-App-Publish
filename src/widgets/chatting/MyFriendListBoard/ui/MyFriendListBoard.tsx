import React, {useState} from 'react';
import styled from 'styled-components/native';
import {FriendCard} from '~/entities/chatting/myFriendCard';
import {MyFriendList} from '~/shared/mapper/chatting';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {useMutation} from '@tanstack/react-query';
import {fetchCreateChattingRoom} from '../api/fetchCreateChattingRoom.ts';
import {CreateChattingRoomResponse} from '~/shared/mapper/chatting';

// FriendListProps 인터페이스 정의
interface MyFriendListBoardProps {
  friends: MyFriendList[]; // MyFriendList 타입의 배열
}

export const MyFriendListBoard = ({friends}: MyFriendListBoardProps) => {
  const {navigateDetailChattingRoom} = useMainNavigate();

  const mutation = useMutation({
    mutationFn: fetchCreateChattingRoom,

    onSuccess: data => {
      console.log('채팅방생성 api 호출이요', data);
      const chatRoomId = (data.payload as CreateChattingRoomResponse).chatRoomId;
      navigateDetailChattingRoom({chatRoomId: chatRoomId, chatRoomName: selectedFriend?.userName});
    },
    onError: error => {
      console.error('채팅방 생성 호출 못함:', error);
    },
  });

  const [selectedFriend, setSelectedFriend] = useState<MyFriendList | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectFriend = (friend: MyFriendList) => {
    setSelectedFriend(prev => {
      console.log(friend, prev);
      if (prev?.userId === friend.userId) {
        return null;
      }
      return friend;
    });
  };

  const deselectFriend = () => {
    setSelectedFriend(null);
  };

  // 친구 이름으로 필터링
  const filteredFriends = friends.filter(friend => {
    return friend?.userName && friend.userName.includes(searchQuery);
  });

  // 친구 목록 렌더링
  const renderItem = ({item}: {item: MyFriendList}) => (
    <FriendCard friend={item} isSelected={selectedFriend?.userId === item.userId} onSelect={() => selectFriend(item)} />
  );
  return (
    <TouchableWithoutFeedback onPress={deselectFriend}>
      <Container>
        <SearchInput placeholder="검색" placeholderTextColor="#A3A3A3" value={searchQuery} onChangeText={setSearchQuery} />
        <FlatList data={filteredFriends} renderItem={renderItem} keyExtractor={item => item.userId.toString()} extraData={selectedFriend} />
        <ChatButton
          active={!!selectedFriend}
          disabled={!selectedFriend}
          onPress={() => {
            if (selectedFriend) {
              mutation.mutate(selectedFriend.userId);
            }
          }}>
          <ChatButtonText>채팅하기</ChatButtonText>
        </ChatButton>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const SearchInput = styled.TextInput`
  height: 40px;
  border-radius: 4px;
  padding-left: 10px;
  margin: 0 10px;
  background-color: #f5f5f5;
`;

const ChatButton = styled.TouchableOpacity<{active: boolean}>`
  background-color: ${({active}) => (active ? '#10B981' : '#f5f5f5')};
  padding: 13px;
  align-items: center;
  margin: 15px 0;
`;

const ChatButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
