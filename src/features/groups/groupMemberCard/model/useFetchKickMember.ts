import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPutKickMember} from '~/features/groups/groupMemberCard/api/fetchPutKickMember.ts';
import {Alert} from 'react-native';
import {groupMemberListQueryKey} from '~/widgets/groups/groupMembersList';

export function useFetchKickMember() {
  const queryClient = useQueryClient();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPutKickMember,
    onSuccess: (_, param) => {
      // 현재 queryKey 의 위치가 widget 에서 넘어왔기 때문에 FSD 아키텍처 규칙에서 벗어남
      queryClient.invalidateQueries({queryKey: [...groupMemberListQueryKey, param.groupsId]});
      Alert.alert('인원 방출', '인원을 방출했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data) {
        Alert.alert('인원 방출', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('인원 방출', '예상치 못한 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function kickMember(groupsId: number, userId: number) {
    Alert.alert('인원 방출', '해당 유저를 모임에서 방출하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {text: '확인', style: 'destructive', onPress: () => mutate({userId, groupsId})},
    ]);
  }

  return {
    isPendingKick: isPending,
    kickMember,
  };
}
