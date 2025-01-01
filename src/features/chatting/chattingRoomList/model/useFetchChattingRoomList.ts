import {useQuery} from '@tanstack/react-query';
import {ChatFilterType, fetchChattingRoomList} from '../api/fetchChattingRoomList.ts';

export const chattingRoomListQueryKey = ['fetchChattingRoomList'];

export function useFetchChattingRoomList(chatRoomType: string) {
  const {isFetching, data, isError} = useQuery({
    queryKey: [...chattingRoomListQueryKey, chatRoomType],
    queryFn: () => fetchChattingRoomList(chatRoomType),
  });
  return {
    isError,
    isFetching,
    data,
  };
}
