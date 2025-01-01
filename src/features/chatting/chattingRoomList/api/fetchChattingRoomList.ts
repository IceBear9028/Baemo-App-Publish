import {ChattingRoom, ChattingRoomResponse} from '~/shared/mapper/chatting';
import {apiRequest} from '~/shared/fetch';

export type ChatFilterType = 'ALL' | ChattingRoom['chatRoomType'];

export async function fetchChattingRoomList(chatRoomType: string) {
  const fetchURL = `api/chat/${chatRoomType}`;
  const {data} = await apiRequest<ChattingRoomResponse[]>(fetchURL, 'get');
  return data.payload.map(chatRes => new ChattingRoom(chatRes));
}

