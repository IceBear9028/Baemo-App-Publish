import {useQuery} from '@tanstack/react-query';
import {fetchGetArticleReasons} from '../api/fetchGetArticleReasons.ts';

export function useFetchGetReasons() {
  const {isFetching, isError, data} = useQuery({
    queryKey: ['fetchGetArticleReasons'],
    queryFn: fetchGetArticleReasons,
    throwOnError: true,
  });

  return {isFetching, isError, data};
}
