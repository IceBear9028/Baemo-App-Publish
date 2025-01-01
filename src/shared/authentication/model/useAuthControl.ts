import {useEffect} from 'react';
import {useAuthStore} from '~/shared/authentication/model/authStore.ts';

/** ## useAuthControl
 * #### 용도
 * * JSX 컴포넌트 내에서 사용하는 자동로그인 커스텀 훅
 * #### 변수 & 메소드 설명
 * * `isAuth` :
 *   * AsyncStorage 에 저장된 토큰의 유효성 여부
 * * `activeAuth` :
 *   * 로그인 이벤트
 *   * 로그인 성공 -> AsyncStorage 에 토큰 저장 및 isAuth 상태 업데이트
 * * `deactivateAuthToken` :
 *   * 로그아웃 이벤트
 *   * 로그아웃 성공 -> AsyncStorage 에 토큰 삭제 및 isAuth 상태 업데이트
 * #### 원리
 * 1. 어플 실행 시 isAuth : false 로 랜더링
 * 2. useEffect 로 initialAuth() 실행(토큰 유효 여부와 isAuth 상태를 서로 동기화)
 * 3. 유효 토큰 여부에 따라 isAuth 상태값 업데이트
 */
export function useAuthControl() {
  const {onAuth, cancelAuth, onAuthOnlySetToken, onAuthOnlyChangeMode} = useAuthStore();

  function activeAuth_TEMP() {
    onAuth({});
  }

  function activeAuth(token: any) {
    onAuth(token);
  }

  function deactivateAuthToken() {
    console.log('cancelAuth');
    cancelAuth();
  }

  function activeAuthOnlySetToken(token: any) {
    onAuthOnlySetToken(token);
  }

  function activeAuthOnlyChangeMode() {
    onAuthOnlyChangeMode();
  }

  return {
    activeAuth,
    deactivateAuthToken,
    activeAuth_TEMP,
    activeAuthOnlySetToken,
    activeAuthOnlyChangeMode,
  };
}
