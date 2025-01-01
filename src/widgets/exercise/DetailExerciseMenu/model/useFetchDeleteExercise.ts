import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useMainNavigate} from '~/shared/route';
import {fetchDeleteExercise} from '../api/fetchDeleteExercise.ts';
import {exerciseIntroQueryKey, useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';
import {fetchMyExerciseListQueryKey} from '~/features/exercise/myExerciseList';

export function useFetchDeleteExercise() {
  const queryClient = useQueryClient();
  const {navigateBack} = useMainNavigate();
  const {resetRole} = useExerciseRoleStore();
  const {isPending, isError, mutate} = useMutation({
    mutationFn: fetchDeleteExercise,
    onSuccess: () => {
      Alert.alert('운동삭제', '운동을 삭제했습니다.', [{text: '확인'}]);
      queryClient.invalidateQueries({queryKey: [...exerciseIntroQueryKey]});
      queryClient.invalidateQueries({queryKey: [...fetchMyExerciseListQueryKey]});
      resetRole();
      navigateBack();
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('운동삭제', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('운동삭제', '운동삭제에 실패했습니다.', [{text: '확인'}]);
      }
    },
  });

  function deleteExercise(exerciseId: number) {
    Alert.alert('운동삭제', '운동을 삭제하시겠습니까?', [
      {text: '취소'},
      {text: '삭제', style: 'destructive', onPress: () => mutate(exerciseId)},
    ]);
  }

  return {
    isPending,
    isError,
    deleteExercise,
  };
}
