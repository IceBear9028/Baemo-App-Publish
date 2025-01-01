import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPostRelationFriend} from '../api/fetchPostRelationFriend.ts';
import {fetchFriendListQueryKey} from '~/pages/chatting/selectChattingFriendPage/model/useFetchFriendList.ts';
import {myFriendListQueryKey} from '~/features/chatting/friendList/model/useFetchGetFriendList.ts';
import {userProfileQueryKey} from '~/features/profile/userProfileCard/model/useFetchGetUserProfile.ts';

export function useFetchPostRelationFriend(targetId: number) {
  const queryClient = useQueryClient();
  const {isPending, mutate} = useMutation({
    mutationFn: () => fetchPostRelationFriend(targetId),
    onSuccess: () => {
      Alert.alert('', '친구 신청이 되었습니다', [
        {
          text: '확인',
          onPress: () => {
            queryClient.invalidateQueries({queryKey: [...userProfileQueryKey]});
            queryClient.invalidateQueries({queryKey: [...fetchFriendListQueryKey]});
            queryClient.invalidateQueries({queryKey: [...myFriendListQueryKey]});
          },
        },
      ]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('친구 신청 실패', error.response?.data.payload as string, [{text: '확인'}]);
      } else {
        Alert.alert('친구 신청 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });
  return {isPending, mutate};
}
