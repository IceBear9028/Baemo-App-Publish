import {useQuery} from '@tanstack/react-query';
import {fetchGetPendingList} from '../api/fetchGetPendingList.ts';

export const applyPendingQueryKey = ['applyPendingQueryKey'];

export function useFetchGetPendingList(exerciseKey: number) {
  const {isError, isPending, data, refetch} = useQuery({
    queryKey: [...applyPendingQueryKey, exerciseKey],
    queryFn: () => fetchGetPendingList(exerciseKey),
    throwOnError: true,
  });
  return {
    isError,
    isPending,
    data,
    refetch,
  };
}
