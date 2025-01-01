import {useQuery} from '@tanstack/react-query';
import {fetchGetJoinGroupRequestList} from '../api/fetchGetJoinGroupRequestList.tsx';

export const applicantListQueryKey = ['fetchGetJoinGroupRequestList'];

export function useJoinGroupRequestMemberList(groupId: number) {
  const {isError, isPending, data, error} = useQuery({
    queryKey: [...applicantListQueryKey, groupId],
    queryFn: () => fetchGetJoinGroupRequestList(groupId),
    throwOnError: true,
  });

  return {
    isError,
    isPending,
    data,
  };
}
