import {apiRequest} from '~/shared/fetch';
import {MyFriendList, MyFriendListResponse} from '~/shared/mapper/chatting';

export async function fetchGetMyFriendList() {
  const {data} = await apiRequest<MyFriendListResponse[]>('api/relation/friend/my', 'get');
  return data.payload.map(resItem => new MyFriendList(resItem));
}
