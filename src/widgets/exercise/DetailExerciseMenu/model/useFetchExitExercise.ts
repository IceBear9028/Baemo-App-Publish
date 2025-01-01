import {useMutation} from '@tanstack/react-query';
import {fetchExitExercise} from '~/widgets/exercise/DetailExerciseMenu/api/fetchExitExercise.ts';
import {useMainNavigate} from '~/shared/route';
import {Alert} from 'react-native';
import {Exercise} from '~/shared/mapper/exercise';

export function useFetchExitExercise() {
  const {navigateBack} = useMainNavigate();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchExitExercise,
    onSuccess: () => {
      navigateBack();
      Alert.alert('운동 나가기', '운동을 나갔습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data) {
        Alert.alert('에러발생', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('에러발생', '문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function exitExercise(exerciseId: number, exerciseStatus: Exercise['exerciseStatus']) {
    if (['PROGRESS', 'COMPLETE'].includes(exerciseStatus)) {
      Alert.alert('운동편집', '운동이 시작되거나 완료되면 나갈 수 없습니다.', [{text: '완료'}]);
    } else {
      mutate(exerciseId);
    }
  }

  return {isPending, exitExercise};
}
