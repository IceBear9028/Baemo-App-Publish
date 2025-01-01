import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchDeleteFriendBlock} from '~/entities/profile/api/fetchDeleteFriendBlock.ts';
import {Alert} from 'react-native';
import {BlockFriendListQueryKey} from '~/features/profile/myBlockFriendList/model/useFetchGetBlockFriendList.ts';
import {myFriendListQueryKey} from '~/features/chatting/friendList/model/useFetchGetFriendList.ts';

export function useFetchDeleteFriendBlock() {
  const queryClient = useQueryClient();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchDeleteFriendBlock,
    onSuccess: () => {
      Alert.alert('차단해제', '친구차단을 해제하셨습니다.', [
        {
          text: '확인',
          onPress: () => {
            queryClient.invalidateQueries({queryKey: [...BlockFriendListQueryKey]});
          },
        },
      ]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('차단해제 실패', error.response?.data.payload as string, [{text: '확인'}]);
      } else {
        Alert.alert('차단해제 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function deleteFriendBlock(relationId: number) {
    Alert.alert('차단해제', '해당 유저 차단을 해제 하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {text: '확인', style: 'destructive', onPress: () => mutate(relationId)},
    ]);
  }

  return {
    isPending,
    deleteFriendBlock,
  };
}
