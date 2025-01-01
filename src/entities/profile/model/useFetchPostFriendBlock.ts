import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPostFriendBlock} from '~/entities/profile/api/fetchPostFriendBlock.ts';
import {Alert} from 'react-native';
import {BlockFriendListQueryKey} from '~/features/profile/myBlockFriendList/model/useFetchGetBlockFriendList.ts';
import {myFriendListQueryKey} from '~/features/chatting/friendList/model/useFetchGetFriendList.ts';

export function useFetchPostFriendBlock() {
  const queryClient = useQueryClient();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPostFriendBlock,
    onSuccess: () => {
      Alert.alert('차단하기', '친구를 차단하셨습니다.', [
        {
          text: '확인',
          onPress: () => {
            queryClient.invalidateQueries({queryKey: [...BlockFriendListQueryKey]});
            queryClient.invalidateQueries({queryKey: [...myFriendListQueryKey]});
          },
        },
      ]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('친구 차단 실패', error.response?.data.payload as string, [{text: '확인'}]);
      } else {
        Alert.alert('친구 차단 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function postFriendBlock(targetId: number) {
    Alert.alert('차단하기', '해당 유저를 차단하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {text: '확인', style: 'destructive', onPress: () => mutate(targetId)},
    ]);
  }

  return {
    isPending,
    postFriendBlock,
  };
}
