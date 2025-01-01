import {apiRequest} from '~/shared/fetch';

export async function fetchPostFriendBlock(targetId: number) {
  const {data} = await apiRequest(`api/relation/block/${targetId}`, 'post');
  return data;
}
