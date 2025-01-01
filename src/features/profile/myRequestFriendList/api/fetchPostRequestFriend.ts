import {apiRequest} from '~/shared/fetch';

export async function fetchPostApproveRequestFriend(targetId: number) {
  const {data} = await apiRequest(`api/relation/friend/approve/${targetId}`, 'post');
  return data;
}

export async function fetchPostRefuseRequestFriend(targetId: number) {
  const {data} = await apiRequest(`api/relation/friend/refuse/${targetId}`, 'post');
  return data;
}
