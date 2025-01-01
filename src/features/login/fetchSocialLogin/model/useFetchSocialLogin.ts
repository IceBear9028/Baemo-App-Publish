import {Alert} from 'react-native';
import {useLoginNavigate} from '~/shared/route';
import {useMutation} from '@tanstack/react-query';
import {useAuthControl, useMyProfileStore} from '~/shared/authentication';
import {fetchPostSocialLogin, SocialLoginRequest} from '../api/fetchPostSocialLogin.ts';

export const useFetchSocialLogin = () => {
  const {activeAuth} = useAuthControl();
  const {navigateSignup, navigateInputSocialUserInfoPage} = useLoginNavigate();
  const updateMyProfile = useMyProfileStore(store => store.setMyProfile);
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPostSocialLogin,
    onSuccess: data => {
      const authToken = data.headers.authorization;
      activeAuth({authorization: authToken});
      updateMyProfile(data.data);
    },
    onError: (error, param) => {
      // 소셜 로그인 시 가입되지 않는 유저라면 회원가입 페이지로 이동
      if (error.response?.data && error.response.data.code === 'AUTH-02') {
        // 핸드폰 번호가 있으면 핸드폰 인증을 거치지 않음
        if (param.phone) {
          navigateInputSocialUserInfoPage();
          return;
        }
        navigateSignup();
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
