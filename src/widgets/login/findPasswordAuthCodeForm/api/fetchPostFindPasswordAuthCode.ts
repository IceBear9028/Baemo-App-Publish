import {apiRequest} from '~/shared/fetch';

export interface ReqFindPasswordAuthCode {
  phone: string;
  authenticationCode: string;
}

export async function fetchPostFindPasswordAuthCode(req: ReqFindPasswordAuthCode) {
  const {data} = await apiRequest('api/users/phone/find/password/authentication', 'post', req);
  return data;
}
