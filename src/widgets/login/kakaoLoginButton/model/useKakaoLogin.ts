import {useState} from 'react';
import {login as loginKakao, getProfile as getKakaoProfile, KakaoProfile} from '@react-native-seoul/kakao-login';

/** ### useKakaoLogin
 * - 카카오 로그인 & 로그아웃을 담당하는 Hook
 * - [카카오 API 문서](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info)
 */
export function useKakaoLogin() {
  const [kakaoToken, setResult] = useState<string>('');
  const [profile, setProfile] = useState<KakaoProfile>();

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await loginKakao();
      if (token) {
        setResult(JSON.stringify(token));
        const kakaoProfileInfo = await getKakaoProfile();
        setProfile(() => kakaoProfileInfo);
      }
    } catch (err) {
      console.error('login err', err);
    }
  };

  return {kakaoToken, profile, signInWithKakao};
}
