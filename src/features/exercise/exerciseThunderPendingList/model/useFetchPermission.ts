import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPutPermission, ReqPermissionGuest} from '../api/fetchPutPermission.ts';
import {Alert} from 'react-native';
import {applyPendingQueryKey} from '~/features/exercise/exerciseThunderPendingList';
import {exerciseMemberListQueryKey} from '~/features/exercise/detailExerciseMembersList';

export function useFetchPermissionGuest(exerciseId: number) {
  const queryClient = useQueryClient();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPutPermission,
    onSuccess: (_, param) => {
      queryClient.invalidateQueries({queryKey: [...applyPendingQueryKey, exerciseId]});
      queryClient.invalidateQueries({queryKey: [...exerciseMemberListQueryKey, exerciseId]});
      const message = param.action === 'APPROVE' ? '해당 인원을 수락했습니다.' : '해당 인원을 거절했습니다.';
      Alert.alert('운동 수락', message, [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('운동 수락', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('운동 수락', '문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function rejectPermission(exerciseId: number, targetUserId: number) {
    const request: ReqPermissionGuest = {
      exerciseId,
      targetUserId,
      action: 'REJECT',
    };
    mutate(request);
  }

  function acceptPermission(exerciseId: number, targetUserId: number) {
    const request: ReqPermissionGuest = {
      exerciseId,
      targetUserId,
      action: 'APPROVE',
    };
    mutate(request);
  }

  return {isPendingPermission: isPending, rejectPermission, acceptPermission};
}
