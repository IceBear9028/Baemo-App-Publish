import {useState} from 'react';
import NaverLogin, {GetProfileResponse, NaverLoginResponse} from '@react-native-seoul/naver-login';

export function useNaverLogin() {
  const [naverToken, setSuccessResponse] = useState<NaverLoginResponse['successResponse']>();
  const [failStatus, setFailStatus] = useState<NaverLoginResponse['failureResponse']>();
  const [naverProfile, setGetProfileRes] = useState<GetProfileResponse>();

  const signInWitNaver = async (): Promise<void> => {
    try {
      const {failureResponse, successResponse} = await NaverLogin.login();
      if (successResponse) {
        setSuccessResponse(successResponse);
        const profileResult = await NaverLogin.getProfile(successResponse.accessToken);
        setGetProfileRes(() => profileResult);
      } else {
        setFailStatus(failureResponse);
      }
    } catch (err) {
      console.error('login err', err);
    }
  };

  const signOutNaver = async () => {
    try {
      await NaverLogin.logout();
    } catch (err) {
      console.error('login err', err);
    }
  };

  return {naverToken, naverProfile, signInWitNaver, signOutNaver};
}
