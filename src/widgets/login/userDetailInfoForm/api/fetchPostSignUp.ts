import {ReqDefaultSignUpUserInfo} from '~/features/login/signUpUserInfo';
import {apiRequest} from '~/shared/fetch';

export async function fetchPostNormalSignUp(req: ReqDefaultSignUpUserInfo) {
  return await apiRequest('/api/users/join', 'post', req);
}
