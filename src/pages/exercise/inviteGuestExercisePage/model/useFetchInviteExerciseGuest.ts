import {Alert} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPostInviteGuest} from '../api/fetchPostInviteGuest.ts';
import {guestJoinListQueryKey} from '~/features/exercise/exerciseApplyGuestList';

export function useFetchInviteExerciseGuest() {
  const queryClient = useQueryClient();
  const {navigateBack} = useMainNavigate();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPostInviteGuest,
    onSuccess: (_, param) => {
      navigateBack();
      queryClient.invalidateQueries({queryKey: [...guestJoinListQueryKey, param.exerciseId]});
      Alert.alert('게스트 초대', '게스트를 초대했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('게스트 초대 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('게스트 초대 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function inviteGuestExercise(exerciseId: number, targetUserId: number) {
    mutate({exerciseId, targetUserId: targetUserId});
  }

  return {isPending, inviteGuestExercise};
}
