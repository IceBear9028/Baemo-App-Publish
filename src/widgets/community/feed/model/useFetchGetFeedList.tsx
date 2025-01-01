import {useQuery} from '@tanstack/react-query';
import {fetchGetFeedList} from '~/widgets/community/feed/api/fetchGetFeedList.ts';

export function useFetchGetFeedList() {
  const {isError, isFetching, data} = useQuery({
    queryKey: ['fetchGetFeedList'],
    queryFn: () => fetchGetFeedList(),
  });
  return {
    isFetching,
    isError,
    data,
  };
}
