import {useQuery} from '@tanstack/react-query';
import {fetchGetGroupReasons} from '../api/fetchGetGroupReasons.ts';

export function useFetchGetReasons() {
  const {isFetching, isError, data} = useQuery({
    queryKey: ['fetchGetGroupReasons'],
    queryFn: fetchGetGroupReasons,
    throwOnError: true,
  });

  return {isFetching, isError, data};
}
