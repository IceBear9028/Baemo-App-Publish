import {apiRequest} from '~/shared/fetch';

export interface ReqAcceptMember {
  clubsId: number;
  nonMemberId: number;
  isAccept: boolean;
}

export async function fetchPostAcceptMember(req: ReqAcceptMember) {
  const {data} = await apiRequest('api/clubs/join/handle', 'post', req);
  return data;
}
