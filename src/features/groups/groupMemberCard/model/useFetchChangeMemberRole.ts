import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPutMemberRole} from '~/features/groups/groupMemberCard/api/fetchPutMemberRole.ts';
import {GroupRole} from '~/shared/mapper/groups';
import {Alert} from 'react-native';
import {groupMemberListQueryKey} from '~/widgets/groups/groupMembersList';

export function useFetchChangeMemberRole() {
  const queryClient = useQueryClient();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPutMemberRole,
    onSuccess: (_, param) => {
      // 현재 queryKey 의 위치가 widget 에서 넘어왔기 때문에 FSD 아키텍처 규칙에서 벗어남
      queryClient.invalidateQueries({queryKey: [...groupMemberListQueryKey, param.groupsId]});
      Alert.alert('권한 설정', '권한을 변경했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data) {
        Alert.alert('권한 설정', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('권한 설정', '예상치 못한 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function changeMemberRole(groupsId: number, userId: number, role: keyof GroupRole) {
    Alert.alert('권한 설정', '유저의 권한을 변경하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {text: '확인', style: 'destructive', onPress: () => mutate({userId, groupsId, groupRole: role})},
    ]);
  }

  return {
    isPendingRole: isPending,
    changeMemberRole,
  };
}
