import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useMainNavigate} from '~/shared/route';
import {myGroupQueryKey} from '~/features/groups/myGroupsList';
import {fetchDeleteGroup} from '~/widgets/groups/DetailGroupMenu/api/fetchDeleteGroup.ts';

export function useFetchDeleteGroup() {
  const queryClient = useQueryClient();
  const {navigateBack} = useMainNavigate();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchDeleteGroup,
    onSuccess: response => {
      // 1. 쿼리 리셋
      queryClient.invalidateQueries({queryKey: myGroupQueryKey});

      // 2. 뒤로 가기
      navigateBack();

      // 3. 오임삭제 성공 알림
      Alert.alert('모임삭제', '모임삭제에 성공했습니다.', [{text: '확인'}]);
    },
    onError: () => {
      Alert.alert('모임삭제 실패', '모임삭제에 실패했습니다.', [{text: '확인'}]);
    },
  });

  function deleteGroup(groupId: number) {
    mutate(groupId);
  }

  return {
    isPendingDel: isPending,
    isErrorDel: isError,
    deleteGroup,
  };
}
