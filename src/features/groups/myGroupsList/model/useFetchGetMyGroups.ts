import {useQuery} from '@tanstack/react-query';
import {fetchGetMyGroups} from '../api/fetchGetMyGroups.ts';

export const myGroupQueryKey = ['fetchGetMyGroups'];

export function useFetchGetMyGroups() {
  const {isFetching, isError, error, data} = useQuery({
    queryKey: myGroupQueryKey,
    queryFn: fetchGetMyGroups,
    throwOnError: true,
  });

  return {
    isFetching,
    isError,
    data,
  };
}
