import {SvgButton} from './SvgButton.tsx';
import BtnAppleSvg from '~/shared/images/svg/btn_apple.svg';
import {useAppleLogin} from '../model/useAppleLogin.ts';
import {useFetchSocialLogin} from '~/features/login/fetchSocialLogin';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {useEffect} from 'react';

export const AppleLoginButton = () => {
  const {fetchSocialLogin} = useFetchSocialLogin();
  const {userSub, userName, onAppleButtonPress} = useAppleLogin();
  const {setSocialInfo, setName} = useSignUpUserInfoStore();

  useEffect(() => {
    const isLoginSuccess = !!userSub;
    if (isLoginSuccess) {
      setSocialInfo(userSub, 'APPLE');
      setName(userName);
      fetchSocialLogin({oauthId: userSub, phone: null}); //애플 로그인 시 휴대폰번호를 주지 않음.
    }
  }, [userSub]);

  return <SvgButton onPress={() => onAppleButtonPress()} icon={<BtnAppleSvg />} />;
};
