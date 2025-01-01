import {useQuery} from '@tanstack/react-query';
import {fetchGetGroupNoticeList} from '../api/fetchGetGroupNoticeList.ts';

export function useFetchGetGroupNoticeList(groupsId: number) {
  const {isFetching, data} = useQuery({
    queryKey: ['fetchGetGroupNoticeList'],
    queryFn: () => fetchGetGroupNoticeList(groupsId),
    throwOnError: true,
  });

  return {
    isFetching,
    data,
  };
}
