import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {useAuthControl, useMyProfileStore} from '~/shared/authentication';
import {fetchPostSocialLogin, SocialLoginRequest} from '../api/fetchPostSocialLogin.ts';

/** ### useFetchSocialLoginForSignUp()
 * > #### 주의!
 * > - **오직 회원가입 할 때에만 사용할 것**
 * > - 일반 로그인 Hook(useFetchSocialLogin) 과 엄연히 다름.
 * - 로그인 후 토큰정보만 업데이트. 메인 페이지로 넘어가지는 않는 Hook
 */
export const useFetchSocialLoginForSignUp = () => {
  const {activeAuthOnlySetToken} = useAuthControl();
  const updateMyProfile = useMyProfileStore(store => store.setMyProfile);
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPostSocialLogin,
    onSuccess: data => {
      const authToken = data.headers.authorization;
      activeAuthOnlySetToken({authorization: authToken});
      updateMyProfile(data.data);
    },
    onError: error => {
      if (error.response?.data) {
        Alert.alert('문제 발생', `${error.response?.data.payload}`, [{text: '확인', style: 'cancel'}]);
      } else {
        Alert.alert('문제 발생', '예상치 못한 문제가 발생했습니다.', [{text: '확인', style: 'cancel'}]);
      }
    },
  });

  function fetchSocialLogin(req: SocialLoginRequest) {
    mutate(req);
  }

  return {
    isErrorSocial: isError,
    isPendingSocial: isPending,
    fetchSocialLogin,
  };
};
