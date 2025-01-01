import {ReqSocialSignupUserInfo} from '~/features/login/signUpUserInfo';
import {apiRequest} from '~/shared/fetch';

export async function fetchPostSocialSignUp(req: ReqSocialSignupUserInfo) {
  const {data} = await apiRequest('api/users/social/join', 'post', req);
  return data;
}
