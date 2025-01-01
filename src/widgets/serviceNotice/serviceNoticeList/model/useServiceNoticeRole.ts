import {useQuery} from '@tanstack/react-query';
import {GroupNoticeResponse} from '../api/fetchGetGroupNoticeList.ts';
import {getServiceNoticeListQueryKey} from '~/widgets/serviceNotice/serviceNoticeList/model/useFetchGetServiceNoticeList.ts';

export function useServiceNoticeRole() {
  const {isFetching, data} = useQuery({
    queryKey: [...getServiceNoticeListQueryKey],
    enabled: false,
    select: (res: GroupNoticeResponse) => res.role,
    throwOnError: true,
  });

  return {
    role: data,
    isFetching,
  };
}
