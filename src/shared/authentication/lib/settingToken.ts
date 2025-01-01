import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthToken {
  authorization: string;
}

const TOKEN_KEY = 'BAEMO_TOKEN';

/**
 * 로그인 성공시 계정의 토큰값을 localstorage에 저장
 * @param token 전달받은 토큰값(string)
 */
export async function setToken(token: AuthToken) {
  const Item = {
    token, 
    lastUpdate: Date.now(),
  };
  await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(Item));
  console.log('토큰', token);
}

/**
 * AsyncStorage 에 저장된 토큰 삭제(로그아웃)
 */
export async function removeToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

/** AsyncStorage 에 저장된 토큰값을 호출
 */
export async function getToken(): Promise<{token: AuthToken; lastUpdate: Date}> {
  const prevData = await AsyncStorage.getItem(TOKEN_KEY);
  const {token, lastUpdate} = JSON.parse(prevData || '{}');
  return {token, lastUpdate};
}
