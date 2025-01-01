import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {RequestFriendListQueryKey} from '~/features/profile/myRequestFriendList/model/useFetchGetRequestFriendList.ts';

export function useRefreshMyRequestFriendList() {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  async function refresh() {
    setFetchingStatus(true);
    try {
      Promise.all([queryClient.refetchQueries({queryKey: RequestFriendListQueryKey})]);
    } catch (error) {
      console.log('쿼리 에러 발생');
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {isFetching, refresh};
}
