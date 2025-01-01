import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {guestJoinListQueryKey} from '~/features/exercise/exerciseApplyGuestList';
import {exerciseMemberListQueryKey} from '~/features/exercise/detailExerciseMembersList';
import {fetchPutPermissionGuest, ReqPermissionGuest} from '../api/fetchPutPermissionGuest.ts';

export function useFetchPermissionGuest(exerciseId: number) {
  const queryClient = useQueryClient();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPutPermissionGuest,
    onSuccess: (_, param) => {
      queryClient.invalidateQueries({queryKey: [...guestJoinListQueryKey, exerciseId]});
      queryClient.invalidateQueries({queryKey: [...exerciseMemberListQueryKey, exerciseId]});

      const message = param.action === 'APPROVE' ? '게스트를 수락했습니다.' : '게스트 초대를 거절했습니다';
      Alert.alert('게스트 초대', message, [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('게스트 초대', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('게스트 초대', '문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function acceptPermission(exerciseId: number, targetUserId: number) {
    const request: ReqPermissionGuest = {
      exerciseId,
      targetUserId,
      action: 'APPROVE',
    };
    mutate(request);
  }
  function rejectPermission(exerciseId: number, targetUserId: number) {
    const request: ReqPermissionGuest = {
      exerciseId,
      targetUserId,
      action: 'REJECT',
    };
    mutate(request);
  }

  return {isPendingPermission: isPending, acceptPermission, rejectPermission};
}
