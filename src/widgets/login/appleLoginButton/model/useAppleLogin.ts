import {useEffect, useState} from 'react';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {jwtDecode} from 'jwt-decode';
import {getAppleUserInfoStorage, setAppleUserInfoStorage} from '../lib/settingAppleUserInfo.ts';

// export interface JWTResponse {
//   aud: string;
//   exp: number;
//   iat: number;
//   sub: string;
//   nonce: string;
//   c_hash: string;
//   email: string;
//   email_verified: boolean;
//   auth_time: number;
//   nonce_supported: boolean;
// }

/**
 * iss : 토큰 발급자로 애플 로그인이기 때문에 https://appleid.apple.com 값을 가진다.
 * sub : 토큰 제목, 사용자를 위한 유일 값을 가진다. user identity가 sub 값으로 존재한다.
 * aud : 토큰 대상자
 * iat : 토큰이 발급된 시간 (UTC)
 * exp : 토큰 만료 시간 (UTC), 토큰을 확인할 때 값이 현재 날짜/시간보다 커야한다.
 * nonce : 클라이언트 세션과 ID 토큰을 연결하는 데 사용되는 문자열 값이다.
 * nonce_supported : 트랜잭션이 지원되지 않는 플랫폼에 있는지 여부를 나타내는 부울 값입니다.
 * email : 사용자 이메일 주소를 나타낸다. 비공개 이메일이면 privaterelay가 붙는다.
 * email_verified : 이메일이 검증되었는지 여부를 나타낸다. Bool 값을 String으로 전달한다.
 * is_private_email : 이메일이 비공개인지 여부를 나타낸다. Bool 값을 String으로 전달한다.
 * real_user_status : 사용자가 실제 사람인지를 포함한 값을 정수 형태로 나타낸다.
 * 출처: https://hyesunzzang.tistory.com/206 [dev.ssun:티스토리]
 */

export function useAppleLogin() {
  const [userSub, setUserSub] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  async function onAppleButtonPress() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    const isAuthorized = credentialState === appleAuth.State.AUTHORIZED;
    const isLoggedInBefore = !appleAuthRequestResponse.fullName?.givenName;

    // 1. 애플 최초 로그인한 경우
    if (isAuthorized && !isLoggedInBefore) {
      const {identityToken, fullName, email} = appleAuthRequestResponse;
      const familyName = fullName?.familyName ? fullName.familyName : '';
      const givenName = fullName?.givenName ? fullName.givenName : '';
      const decodedToken = jwtDecode(identityToken!);

      await setAppleUserInfoStorage(fullName, email);
      setEmail(email ? email : '');
      setUserName(familyName + givenName);
      setUserSub(decodedToken.sub ? decodedToken.sub : '');
    }

    // 2. 이미 이전에 애플 로그인한 경우
    if (isAuthorized && isLoggedInBefore) {
      const {identityToken} = appleAuthRequestResponse;
      const storedAppleUser = await getAppleUserInfoStorage();
      const hasUserName = storedAppleUser.userName;
      const decodedToken = jwtDecode(identityToken!);
      if (hasUserName) {
        const {userName, email} = storedAppleUser;
        const familyName = userName?.familyName ? userName.familyName : '';
        const givenName = userName?.givenName ? userName.givenName : '';

        setEmail(() => (email ? email : ''));
        setUserName(familyName + givenName);
      } else {
        setEmail(() => (email ? email : ''));
        setUserName('');
      }
      setUserSub(decodedToken.sub ? decodedToken.sub : '');
    }
  }

  useEffect(() => {
    // 유저 Credentials 에러처리
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked');
    });
  }, []);

  return {userSub, userName, onAppleButtonPress};
}
