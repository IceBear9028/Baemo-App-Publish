import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPostGameCourt} from '../api/fetchPostGameCourt.ts';
import {getGameCourtListQueryKey} from '~/features/game/fetchCourtList';
import {useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';

export function useFetchCreateGameCourt() {
  const queryClient = useQueryClient();
  const exerciseId = useExerciseRoleStore(store => store.exerciseId);
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPostGameCourt,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [...getGameCourtListQueryKey, exerciseId]});
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('코트 생성 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('코트 생성 실패', '예상치 못한 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function createGameCourt(courtNumber: number) {
    mutate({exerciseId, courtNumber});
  }

  return {
    isPendingCreateCourt: isPending,
    createGameCourt,
  };
}
