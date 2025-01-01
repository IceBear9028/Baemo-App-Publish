import {apiRequest} from '~/shared/fetch';
import {ChattingMessageResponse} from '~/shared/mapper/chatting';

// export async function fetchChattingMessage(chatRoomId: string, pageSize: number, pageNumber: number) {
//   const {data} = await apiRequest(`api/chat?chatRoomId=${chatRoomId}&pageSize=${pageSize}&pageNumber=${pageNumber}`, 'get');
//   return data.payload as ChattingMessageResponse;
// }

export async function fetchChattingMessage(chatRoomId: string) {
  const {data} = await apiRequest<ChattingMessageResponse>(`api/chat?chatRoomId=${chatRoomId}`, 'get');
  return data.payload;
}
