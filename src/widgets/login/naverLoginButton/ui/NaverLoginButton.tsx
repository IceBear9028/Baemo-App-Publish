import {useEffect} from 'react';
import BtnNaverSvg from '~/shared/images/svg/btn_naver.svg';
import {useFetchSocialLogin} from '~/features/login/fetchSocialLogin';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {SvgButton} from '~/widgets/login/naverLoginButton/ui/SvgButton.tsx';
import {useNaverLogin} from '~/widgets/login/naverLoginButton/model/useNaverLogin.ts';

export const NaverLoginButton = () => {
  const {fetchSocialLogin} = useFetchSocialLogin();
  const {naverToken, naverProfile, signInWitNaver} = useNaverLogin();
  const setName = useSignUpUserInfoStore(store => store.setName);
  const setPhone = useSignUpUserInfoStore(store => store.setPhone);
  const setBirth = useSignUpUserInfoStore(store => store.setBirth);
  const setGender = useSignUpUserInfoStore(store => store.setGender);
  const setSocialInfo = useSignUpUserInfoStore(store => store.setSocialInfo);

  useEffect(() => {
    if (naverProfile) {
      const name = naverProfile.response.name;
      const oauthId = naverProfile.response.id;
      const birtDay = naverProfile.response.birthday; // MM-DD
      const birthYear = naverProfile.response.birthyear; // YYYY
      const gender = naverProfile.response.gender; // F : 여성, M : 남성, U : 확인불가
      const phoneNumber = naverProfile.response.mobile ? naverProfile.response.mobile.replace(/-/g, '') : '';
      const fullBirthDay = birtDay && birthYear ? `${birthYear}-${birtDay}` : null;

      setName(name);
      setPhone(phoneNumber);
      setSocialInfo(oauthId, 'NAVER');
      fullBirthDay && setBirth(new Date(fullBirthDay));
      gender !== 'U' && setGender(gender as 'F' | 'M');
      fetchSocialLogin({oauthId, phone: naverProfile.response.mobile});
    }
  }, [naverToken, naverProfile]);

  return <SvgButton onPress={signInWitNaver} icon={<BtnNaverSvg />} />;
};
