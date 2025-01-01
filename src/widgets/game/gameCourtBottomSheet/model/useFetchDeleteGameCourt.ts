import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchDeleteGameCourt} from '../api/fetchDeleteGameCourt';
import {useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';
import {getGameCourtListQueryKey} from '~/features/game/fetchCourtList';
import {Alert} from 'react-native';

export function useFetchDeleteGameCourt(exerciseCourtId: number) {
  const queryClient = useQueryClient();
  const exerciseId = useExerciseRoleStore(store => store.exerciseId);
  const {isPending, mutate} = useMutation({
    mutationFn: fetchDeleteGameCourt,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [...getGameCourtListQueryKey, exerciseId]});
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('코트 삭제 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('코트 삭제 실패', '예상치 못한 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function deleteGameCourt() {
    Alert.alert('코트 삭제', '코트를 삭제할까요?', [
      {text: '취소'},
      {text: '삭제', style: 'destructive', onPress: () => mutate({exerciseId, exerciseCourtId: exerciseCourtId})},
    ]);
  }

  return {
    isPendingDelCourt: isPending,
    deleteGameCourt,
  };
}
{
}
