import {apiRequest} from '~/shared/fetch';
import {DuplicateAccount, DuplicateAccountResponse} from '~/shared/mapper/login';

export interface ReqValidCode {
  phone: string;
  authenticationCode: string;
}

export async function fetchCheckValidPhoneNumber(req: ReqValidCode) {
  const {data} = await apiRequest<DuplicateAccountResponse, ReqValidCode>('api/users/phone/authentication', 'post', req);
  return new DuplicateAccount(data.payload);
}
