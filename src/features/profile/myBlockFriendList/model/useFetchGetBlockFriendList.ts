import {useQuery} from '@tanstack/react-query';
import {fetchGetBlockFriendList} from '~/features/profile/myBlockFriendList/api/fetchGetBlockFriendList.ts';

export const BlockFriendListQueryKey = ['fetchGetBlockFriendList'];

export function useFetchGetBlockFriendList() {
  const {isFetching, isError, data} = useQuery({
    queryKey: [...BlockFriendListQueryKey],
    queryFn: () => fetchGetBlockFriendList(),
  });

  return {isFetching, isError, data};
}
