import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useMainNavigate} from '~/shared/route';
import {myGroupQueryKey} from '~/features/groups/myGroupsList';
import {fetchExitGroup} from '../api/fetchExitGroup.ts';

export function useFetchExitGroup() {
  const queryClient = useQueryClient();
  const {navigateBack} = useMainNavigate();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchExitGroup,
    onSuccess: response => {
      // 1. 쿼리 리셋
      queryClient.invalidateQueries({queryKey: myGroupQueryKey});

      // 2. 뒤로 가기
      navigateBack();

      // 3. 오임삭제 성공 알림
      Alert.alert('모임탈퇴', '모임을 탈퇴했습니다.', [{text: '확인'}]);
    },
    onError: () => {
      Alert.alert('모임탈퇴 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
    },
  });

  function exitGroup(groupId: number) {
    Alert.alert('모임 탈퇴', '모임을 나가시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {text: '탈퇴', style: 'destructive', onPress: () => mutate(groupId)},
    ]);
  }

  return {
    isPendingExit: isPending,
    isErrorExit: isError,
    exitGroup,
  };
}
