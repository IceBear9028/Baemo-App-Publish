import {useQuery} from '@tanstack/react-query';
import {fetchGetCourtList} from '../api/fetchGetCourtList.ts';
import {useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';

export const getGameCourtListQueryKey = ['getGameCourtListQueryKey'];

export function useFetchGetGameCourtList() {
  const exerciseId = useExerciseRoleStore(store => store.exerciseId);
  const {data, isFetching, refetch} = useQuery({
    queryKey: [...getGameCourtListQueryKey, exerciseId],
    queryFn: () => fetchGetCourtList(exerciseId),
  });

  return {
    isFetchingCourtList: isFetching,
    refetchCourtList: refetch,
    courtList: data,
  };
}
