import {useQuery} from '@tanstack/react-query';
import {fetchGetUserReasons} from '../api/fetchGetUserReasons.ts';

export function useFetchGetReasons() {
  const {isFetching, isError, data} = useQuery({
    queryKey: ['fetchGetUserReasons'],
    queryFn: fetchGetUserReasons,
  });

  return {isFetching, isError, data};
}
