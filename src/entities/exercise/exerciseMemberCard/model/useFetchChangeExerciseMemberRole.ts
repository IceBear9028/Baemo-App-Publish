import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPutExerciseRoleMember} from '../api/fetchPutExerciseRoleMember.ts';
import {exerciseMemberListQueryKey} from '~/features/exercise/detailExerciseMembersList';
import {ExerciseMemberRole} from '~/shared/mapper/exercise/lib/exerciseMember.ts';

export function useFetchChangeExerciseMemberRole() {
  const queryClient = useQueryClient();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPutExerciseRoleMember,
    onSuccess: (_, param) => {
      // 현재 queryKey 의 위치가 feature 에서 넘어왔기 때문에 FSD 아키텍처 규칙에서 벗어남
      queryClient.invalidateQueries({queryKey: [...exerciseMemberListQueryKey, param.exerciseId]});
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

  function changeMemberRole(exerciseId: number, userId: number, userRole: keyof ExerciseMemberRole) {
    const action = userRole === 'MEMBER' ? 'UPGRADE' : 'DOWNGRADE';
    const message = userRole === 'MEMBER' ? '해당 유저를 관리자로 변경할까요?' : '해당 유저를 관리자에서 박탈할까요?';
    Alert.alert('권한 설정', message, [
      {text: '취소', style: 'cancel'},
      {text: '확인', style: 'destructive', onPress: () => mutate({exerciseId, targetUserId: userId, action})},
    ]);
  }

  return {
    isPendingRole: isPending,
    changeMemberRole,
  };
}
