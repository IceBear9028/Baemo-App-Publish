import {create} from 'zustand';
import {AuthToken, getToken, removeToken, setToken} from '../lib/settingToken.ts';

interface State {
  isAuth: boolean;
  token?: AuthToken;
}

interface Actions {
  initialAuth: () => Promise<void>;
  onAuth: (token: any) => Promise<void>;
  cancelAuth: () => Promise<void>;

  onAuthOnlySetToken: (token: any) => Promise<void>;
  onAuthOnlyChangeMode: () => Promise<void>;
}

/** ### useAuthStore
 * #### 용도
 * 모바일 자동로그인을 위한 Zustand 전역 상태
 * #### key 의미
 * * `isAuth` :
 *   * AsyncStorage 에 저장된 토큰의 유효성 여부
 * * `initialAuth` :
 *   * 어플 처음 로딩 시 AsyncStorage 의 token 유효성을 판단
 *   * 유효성 여부에 따라 isAuth 상태를 업데이트
 * * `onAuth` :
 *   * AsyncStorage 에 token 을 업데이트(로그인)
 * * `cancelAuth` :
 *   * 기존 AsyncStorage 내에 있던 토큰을 삭제(로그아웃)
 * */
export const useAuthStore = create<State & Actions>(set => ({
  isAuth: false,
  token: undefined,
  initialAuth: async () => {
    const {lastUpdate, token} = await getToken();
    if (lastUpdate) {
      set(() => ({isAuth: true, token}));
    } else {
      await removeToken();
      set(() => ({isAuth: false}));
    }
  },
  onAuth: async (token: any) => {
    await setToken(token);
    set(() => ({isAuth: true, token}));
  },
  cancelAuth: async () => {
    await removeToken();
    set(() => ({isAuth: false}));
  },
  onAuthOnlyChangeMode: async () => {
    set(prev => ({...prev, isAuth: true}));
  },
  onAuthOnlySetToken: async token => {
    await setToken(token);
  },
}));
