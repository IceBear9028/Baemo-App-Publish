import {useQuery} from '@tanstack/react-query';
import {fetchFriendList} from '../api/fetchFriendList.ts';

export const fetchFriendListQueryKey = ['fetchFriendList'];

export function useFetchFriendList() {
  const {isFetching, data, isError} = useQuery({
    queryKey: [...fetchFriendListQueryKey],
    queryFn: () => fetchFriendList(),
  });

  return {
    isError,
    isFetching,
    data,
  };
}
