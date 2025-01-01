import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {chattingRoomListQueryKey} from '~/features/chatting/chattingRoomList/model/useFetchChattingRoomList.ts';

export function useRefreshChattingRoomList() {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  function refreshChattingRoomList() {
    setFetchingStatus(true);
    try {
      Promise.all([queryClient.refetchQueries({queryKey: chattingRoomListQueryKey})]);
    } catch (error) {
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {isFetching, refreshChattingRoomList};
}
