import {apiRequest} from '~/shared/fetch';
import {MyBlockFriendList, MyFriendListResponse} from '~/shared/mapper/chatting';

export async function fetchGetBlockFriendList() {
  const {data} = await apiRequest<MyFriendListResponse[]>('api/relation/block/my', 'get');
  return data.payload.map(friend => new MyBlockFriendList(friend));
}
