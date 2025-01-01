import {apiRequest} from '~/shared/fetch';

export interface ReqResetPassword {
  phone: string;
  password: string;
}

export async function fetchPutResetPassword(req: ReqResetPassword) {
  const {data} = await apiRequest('api/users/phone/find/password', 'put', req);
  return data;
}
