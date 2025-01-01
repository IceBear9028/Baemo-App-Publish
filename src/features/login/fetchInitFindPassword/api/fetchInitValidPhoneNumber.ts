import {SignUpUserInfo} from '~/features/login/signUpUserInfo';
import {apiRequest} from '~/shared/fetch';

interface CheckValidPhoneNumberFormApi extends Pick<SignUpUserInfo, 'phone'> {}

export async function fetchInitValidPhoneNumber(request: CheckValidPhoneNumberFormApi) {
  const {data, status} = await apiRequest('/api/users/phone/find/password', 'post', request);
  return data;
}
