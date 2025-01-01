import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPutExerciseStatus} from '~/widgets/exercise/DetailExerciseMenu/api/fetchPutExerciseStatus.ts';
import {ExerciseStatus} from '~/shared/mapper/exercise';
import {Alert} from 'react-native';
import {exerciseIntroQueryKey} from '~/features/exercise/detailExerciseIntroduction';

export function useFetchChangeExerciseStatus() {
  const queryClient = useQueryClient();

  const {isPending, mutate} = useMutation({
    mutationFn: fetchPutExerciseStatus,
    onSuccess: (_, param) => {
      queryClient.invalidateQueries({queryKey: [...exerciseIntroQueryKey, param.exerciseId]});
      Alert.alert('운동상태 변경', '운동상태를 변경했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('운동상태 변경 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('운동상태 변경 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function changeExerciseStatus(exerciseId: number, status: keyof ExerciseStatus) {
    Alert.alert('운동상태 변경', '운동상태를 변경할까요?', [
      {text: '취소', style: 'cancel'},
      {text: '변경', style: 'default', onPress: () => mutate({exerciseId, action: status})},
    ]);
  }

  return {isPendingChange: isPending, changeExerciseStatus};
}
