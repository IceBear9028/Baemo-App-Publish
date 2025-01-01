import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {useFetchSocialLoginForSignUp} from '~/features/login/fetchSocialLogin';
import {useFetchStandardLoginForSignUp} from '~/features/login/fetchStandardLogin';
import {useEffect} from 'react';

/** ### useLoginForSignUp()
 * **사용용도**
 * 1. 회원가입 후, 프로필 정보를 변경하기 위해 회원가입 후 바로 로그인 시도
 * 2. 로그인 후 메인페이지로 넘어가지 않고 토큰정보, 프로필 정보만 업데이트
 */
export function useLoginForSignUp() {
  const {password, phone, type, oauth_id} = useSignUpUserInfoStore(status => status.store);
  const {fetchSocialLogin} = useFetchSocialLoginForSignUp();
  const {fetchStandardLogin} = useFetchStandardLoginForSignUp();

  useEffect(() => {
    if (type === 'BAEMO') {
      fetchStandardLogin({phone, password});
    } else {
      fetchSocialLogin({oauthId: oauth_id, phone: phone});
    }
  }, []);
}
