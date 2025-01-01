import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {myFriendListQueryKey} from '~/features/chatting/friendList/model/useFetchGetFriendList.ts';

export function useRefreshMyFriendList() {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  async function refresh() {
    setFetchingStatus(true);
    try {
      Promise.all([queryClient.refetchQueries({queryKey: myFriendListQueryKey})]);
    } catch (error) {
      console.log('쿼리 에러 발생');
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {isFetching, refresh};
}
