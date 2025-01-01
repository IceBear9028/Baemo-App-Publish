import {useQuery} from '@tanstack/react-query';
import {fetchGetMyFriendList} from '../api/fetchGetMyFriendList.ts';

export const myFriendListQueryKey = ['fetchGetMyFriendList'];
export function useFetchGetFriendList() {
  const {isFetching, isError, data} = useQuery({
    queryKey: [...myFriendListQueryKey],
    queryFn: () => fetchGetMyFriendList(),
  });
  console.log('data확인', data);
  return {isFetching, isError, data};
}
