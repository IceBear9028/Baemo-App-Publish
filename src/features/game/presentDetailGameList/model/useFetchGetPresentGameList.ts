import {useQuery} from '@tanstack/react-query';
import {fetchGetPresentGameList} from '../api/fetchGetPresentGameList.ts';

export const getPresentGameListQueryKey = ['getPresentGameListQueryKey'];

export function useFetchGetPresentGameList(exerciseId: number) {
  const {isError, isFetching, data, refetch} = useQuery({
    queryKey: [...getPresentGameListQueryKey, exerciseId],
    queryFn: () => fetchGetPresentGameList(exerciseId),
    enabled: !Number.isNaN(exerciseId),
  });
  return {
    isError,
    isFetching,
    data,
    refetch,
  };
}
