import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchFriendListQueryKey} from '~/pages/chatting/selectChattingFriendPage/model/useFetchFriendList.ts';
import {myFriendListQueryKey} from '~/features/chatting/friendList/model/useFetchGetFriendList.ts';
import {fetchPostApproveRequestFriend, fetchPostRefuseRequestFriend} from '../api/fetchPostRequestFriend.ts';
import {RequestFriendListQueryKey} from '../model/useFetchGetRequestFriendList.ts';

export function useFetchPostApproveRequestFriend(targetId: number) {
  const queryClient = useQueryClient();
  const {isPending, mutate} = useMutation({
    mutationFn: () => fetchPostApproveRequestFriend(targetId),
    onSuccess: () => {
      Alert.alert('', '친구 요청이 승락 되었습니다', [
        {
          text: '확인',
          onPress: () => {
            queryClient.invalidateQueries({queryKey: [...fetchFriendListQueryKey]});
            queryClient.invalidateQueries({queryKey: [...myFriendListQueryKey]});
            queryClient.invalidateQueries({queryKey: [...RequestFriendListQueryKey]});
          },
        },
      ]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('친구 수락 실패', error.response?.data.payload as string, [{text: '확인'}]);
      } else {
        Alert.alert('친구 수락 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });
  return {isPending, mutate};
}

export function useFetchPostRefuseRequestFriend(targetId: number) {
  const queryClient = useQueryClient();
  const {isPending, mutate} = useMutation({
    mutationFn: () => fetchPostRefuseRequestFriend(targetId),
    onSuccess: () => {
      Alert.alert('', '친구 요청이 거절 되었습니다', [
        {
          text: '확인',
          onPress: () => {
            queryClient.invalidateQueries({queryKey: [...RequestFriendListQueryKey]});
          },
        },
      ]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('친구 거절 실패', error.response?.data.payload as string, [{text: '확인'}]);
      } else {
        Alert.alert('친구 거절 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });
  return {isPending, mutate};
}
