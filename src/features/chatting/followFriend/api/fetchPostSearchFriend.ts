import {apiRequest} from '~/shared/fetch';

export interface ReqSearchFriend {
  userCode: string;
}

export async function fetchPostSearchFriend(req: ReqSearchFriend) {
  const {data} = await apiRequest('api/relation/friend/search', 'post', req);
  return data;
}
