import {useQuery} from '@tanstack/react-query';
import {fetchGetGroupMembers} from '../api/fetchGetGroupMembers.ts';

export const groupMemberListQueryKey = ['fetchGetGroupMembers'];

export function useFetchGetGroupMembers(groupId: number) {
  const {isError, isFetching, data} = useQuery({
    queryKey: [...groupMemberListQueryKey, groupId],
    queryFn: () => fetchGetGroupMembers(groupId),
    throwOnError: true,
  });
  return {
    isError,
    isFetching,
    data,
  };
}
