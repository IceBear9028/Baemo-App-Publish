import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPostJoinExercise} from '../api/fetchPostJoinExercise.ts';
import {exerciseIntroQueryKey} from '~/features/exercise/detailExerciseIntroduction';

export function useFetchApplyExercise(exerciseId: number) {
  const queryClient = useQueryClient();
  const {isPending, isError, mutate} = useMutation({
    mutationFn: fetchPostJoinExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [...exerciseIntroQueryKey, exerciseId]});
      Alert.alert('운동 신청', '운동을 신청 했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('운동 신청', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('운동 신청', `운동 신청에 문제가 발생했습니다.`, [{text: '확인'}]);
      }
    },
  });

  function applyExercise() {
    mutate(exerciseId);
  }

  return {
    isPendingApply: isPending,
    isErrorApply: isError,
    applyExercise,
  };
}
