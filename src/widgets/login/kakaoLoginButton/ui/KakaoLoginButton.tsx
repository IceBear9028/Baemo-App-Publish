import {useEffect} from 'react';
import {SvgButton} from './SvgButton.tsx';
import BtnKakaoSvg from '~/shared/images/svg/btn_kakao.svg';
import {useKakaoLogin} from '../model/useKakaoLogin.ts';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {useFetchSocialLogin} from '~/features/login/fetchSocialLogin';

function insertAtPosition(str: string, index: number, value: string): string {
  if (!str) {
    return '';
  }
  // index 이전까지 자르고 value를 삽입한 뒤 나머지 문자열을 붙임
  return str.slice(0, index) + value + str.slice(index);
}

export const KakaoLoginButton = () => {
  const {fetchSocialLogin} = useFetchSocialLogin();
  const {kakaoToken, profile, signInWithKakao} = useKakaoLogin();
  const setName = useSignUpUserInfoStore(store => store.setName);
  const setPhone = useSignUpUserInfoStore(store => store.setPhone);
  const setBirth = useSignUpUserInfoStore(store => store.setBirth);
  const setGender = useSignUpUserInfoStore(store => store.setGender);
  const setSocialInfo = useSignUpUserInfoStore(store => store.setSocialInfo);

  function convertData(birthYear: string, birthDay: string) {
    // 안드로이드의 경우
    if (!birthDay || !birthYear) {
      return null;
    }
    // ios 의 경우
    if (birthDay === 'null' || birthYear === 'null') {
      return null;
    }
    try {
      const fullBirthDay = `${birthYear}-${insertAtPosition(birthDay, 2, '-')}`;
      return new Date(fullBirthDay);
    } catch (err) {
      return null;
    }
  }

  function convertGender(input: string) {
    switch (input) {
      case 'female':
        return 'F';
      case 'male':
        return 'M';
      default:
        return 'X';
    }
  }

  function convertPhone(kakaoPhone: string) {
    //+82 00-0000-0000
    if (!kakaoPhone || kakaoPhone === 'null') {
      return '';
    }
    const splitNumber = kakaoPhone.split('-');
    return '010' + splitNumber[1] + splitNumber[2];
  }

  useEffect(() => {
    if (kakaoToken && profile) {
      const name = profile.name;
      const birtDay = profile.birthday; // MMDD
      const birthYear = profile.birthyear; // YYYY
      const profileId = String(profile.id);
      const gender = convertGender(profile.gender); // female : 여성, male : 남성
      const phoneNumber = convertPhone(profile.phoneNumber); //+82 00-0000-0000
      const fullBirthDay = convertData(birthYear, birtDay);

      setName(name);
      setPhone(phoneNumber);
      setGender(gender as 'F' | 'M');
      setSocialInfo(profileId, 'KAKAO');
      fullBirthDay && setBirth(fullBirthDay);

      fetchSocialLogin({oauthId: profileId, phone: phoneNumber});
    }
  }, [kakaoToken, profile]);

  return <SvgButton onPress={signInWithKakao} icon={<BtnKakaoSvg />} />;
};
