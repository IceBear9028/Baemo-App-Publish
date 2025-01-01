import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {MyFriendList} from '~/shared/mapper/chatting';
import {RootMainStackParamList} from '~/shared/route';
import {FriendCard} from '~/entities/chatting/myFriendCard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, ButtonSpinner, ButtonText, SafeAreaView} from '@gluestack-ui/themed';
import {useSelectFriend} from '~/pages/exercise/inviteGuestExercisePage/model/useSelectFriend.ts';
import {useSearchFriend} from '~/pages/exercise/inviteGuestExercisePage/model/useSearchFriend.ts';
import {useFetchInviteExerciseGuest} from '../model/useFetchInviteExerciseGuest.ts';
import {useFetchGetFriendList} from '../model/useFetchGetFriendList.ts';

export interface InviteGuestExercisePageProps extends NativeStackScreenProps<RootMainStackParamList, 'inviteGuestExercisePage'> {}

export const InviteGuestExercisePage = ({route}: InviteGuestExercisePageProps) => {
  const {searchQuery, setSearchQuery} = useSearchFriend();
  const {isFetching, data} = useFetchGetFriendList(searchQuery);
  const {selectedFriend, selectFriend, deselectFriend} = useSelectFriend();
  const {inviteGuestExercise} = useFetchInviteExerciseGuest();

  // 친구 목록 렌더링
  const renderItem = ({item}: {item: MyFriendList}) => (
    <FriendCard friend={item} isSelected={selectedFriend?.userId === item.userId} onSelect={() => selectFriend(item)} />
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <SearchInput placeholder="검색" placeholderTextColor="#A3A3A3" value={searchQuery} onChangeText={setSearchQuery} />
        <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.userId.toString()} extraData={selectedFriend} />
        <StyledButtonContainer>
          <Button
            size="lg"
            isDisabled={!selectedFriend}
            onPress={() => {
              if (selectedFriend) {
                inviteGuestExercise(route.params.exerciseId, selectedFriend.userId);
              }
            }}>
            {isFetching && <ButtonSpinner />}
            <ButtonText>다음</ButtonText>
          </Button>
        </StyledButtonContainer>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
`;

const SearchInput = styled.TextInput`
  height: 40px;
  border-radius: 4px;
  padding-left: 10px;
  margin: 0 20px;
  background-color: #f5f5f5;
`;

const StyledButtonContainer = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
`;
