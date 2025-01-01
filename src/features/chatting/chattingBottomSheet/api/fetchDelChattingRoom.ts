import {apiRequest} from '~/shared/fetch';

export interface ReqDelChattingRoom {
  roomId: string;
}

export async function fetchDelChattingRoom({roomId}: ReqDelChattingRoom) {
  const {data} = await apiRequest(`/api/chat/${roomId}`, 'delete');
  return data;
}
