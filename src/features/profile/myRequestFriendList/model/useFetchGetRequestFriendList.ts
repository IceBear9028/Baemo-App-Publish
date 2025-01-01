import {useQuery} from '@tanstack/react-query';
import {fetchGetRequestFriendList} from '../api/fetchGetRequestFriendList';

export const RequestFriendListQueryKey = ['fetchGetRequestFriendList'];

export function useFetchGetRequestFriendList() {
  const {isFetching, isError, data} = useQuery({
    queryKey: [...RequestFriendListQueryKey],
    queryFn: () => fetchGetRequestFriendList(),
  });

  return {isFetching, isError, data};
}
