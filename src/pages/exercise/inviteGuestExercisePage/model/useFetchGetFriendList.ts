import {useQuery} from '@tanstack/react-query';
import {fetchGetMyFriendList} from '../api/fetchGetMyFriendList.ts';

export function useFetchGetFriendList(searchQuery: string) {
  const {isFetching, isError, data} = useQuery({
    queryKey: ['fetchGetMyFriendList'],
    queryFn: () => fetchGetMyFriendList(),
    select: friendList => {
      return friendList.filter(friend => {
        return friend.userName.includes(searchQuery);
      });
    },
  });
  return {isFetching, isError, data};
}
