import {useQuery} from '@tanstack/react-query';
import {fetchGetUserGroupList} from '../api/fetchGetUserGroupList.ts';

export function useFetchGetUserGroupList(userId: number) {
  const {isFetching, isError, data} = useQuery({
    queryKey: ['userGroupList'],
    queryFn: () => fetchGetUserGroupList(userId),
  });

  return {
    isFetching,
    isError,
    data,
  };
}
