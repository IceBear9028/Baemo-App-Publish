import {apiRequest} from '~/shared/fetch';
import {MyRequestFriendList, MyFriendListResponse} from '~/shared/mapper/chatting';

export async function fetchGetRequestFriendList() {
  const {data} = await apiRequest<MyFriendListResponse[]>('api/relation/friend/apply/my', 'get');
  return data.payload.map(friend => new MyRequestFriendList(friend));
}
