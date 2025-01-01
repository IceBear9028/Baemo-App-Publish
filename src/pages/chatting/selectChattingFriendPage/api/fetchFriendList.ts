import {apiRequest} from '~/shared/fetch';
import {MyFriendListResponse, MyFriendList} from '~/shared/mapper/chatting';

export async function fetchFriendList() {
  const {data} = await apiRequest<{code: string; payload: MyFriendListResponse[]}>('api/relation/friend/my', 'get');
  if (Array.isArray(data.payload)) {
    console.log('payload는 배열임:', data.payload);
    return data.payload.map(friendRes => new MyFriendList(friendRes));
  } else {
    console.log('payload는 배열아님:', data.payload);
    return [];
  }
}
