import {useQuery} from '@tanstack/react-query';
import {fetchGetGroupNoticeList} from '../api/fetchGetGroupNoticeList.ts';

export const getServiceNoticeListQueryKey = ['getServiceNoticeListQueryKey'];

export function useFetchGetServiceNoticeList() {
  const {isFetching, data, refetch} = useQuery({
    queryKey: [...getServiceNoticeListQueryKey],
    queryFn: () => fetchGetGroupNoticeList(),
    select: res => res.noticeList,
    throwOnError: true,
  });

  return {
    isFetching,
    refetch,
    data,
  };
}
