import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {useFetchSocialLogin} from '~/features/login/fetchSocialLogin';
import {useFetchStandardLogin} from '~/features/login/fetchStandardLogin';

export function useStartBaemoModel() {
  const {password, phone, type, oauth_id} = useSignUpUserInfoStore(status => status.store);
  const {isPendingSocial, fetchSocialLogin} = useFetchSocialLogin();
  const {isPendingStandard, fetchStandardLogin} = useFetchStandardLogin();

  if (type === 'BAEMO') {
    return {isPending: isPendingStandard, fetchLogin: () => fetchStandardLogin({phone, password})};
  } else {
    return {isPending: isPendingSocial, fetchLogin: () => fetchSocialLogin({oauthId: oauth_id, phone: phone})};
  }
}
