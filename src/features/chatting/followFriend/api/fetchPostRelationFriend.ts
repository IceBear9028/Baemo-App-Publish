import {apiRequest} from '~/shared/fetch';

export async function fetchPostRelationFriend(targetId: number) {
  const {data} = await apiRequest(`api/relation/friend/${targetId}`, 'post');
  return data;
}
