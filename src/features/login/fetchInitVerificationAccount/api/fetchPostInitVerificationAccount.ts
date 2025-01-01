import {SignUpUserInfo} from '~/features/login/signUpUserInfo';
import {apiRequest} from '~/shared/fetch';

interface CheckValidPhoneNumberFormApi extends Pick<SignUpUserInfo, 'phone'> {}

/** 핸드폰 유효성검증 시작 api
 */
export async function fetchPostInitVerificationAccount(request: CheckValidPhoneNumberFormApi) {
  const {data, status} = await apiRequest('api/users/phone/sign-up', 'post', request);
  return data;
}
