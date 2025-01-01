import {ChattingRoom, ChattingRoomResponse} from '~/shared/mapper/chatting';
import {apiRequest_TEMP} from '~/shared/fetch';

export type ChatFilterType = 'all' | ChattingRoom['chatRoomType'];

export async function fetchGetChattingRoomList(chatRoomType: ChatFilterType) {
  const fetchURL = chatRoomType === 'all' ? 'chattingRoomList' : `chattingRoomList?&chatRoomType=${chatRoomType}`;
  const {data} = await apiRequest_TEMP<ChattingRoomResponse[]>(fetchURL, 'get');
  return data.map(chatRes => new ChattingRoom(chatRes));
}
