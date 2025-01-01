import {AppleRequestResponseFullName} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APPLE_USER_KEY = 'APPLE_USER_KEY';

type AppleUserNameParam = AppleRequestResponseFullName | null;
type AppleUserEmail = string | null;

/** ### AppleUserInfo
 * #### 사용용도
 * - 최초 애플 로그인 시 AsyncStorage 에 저장되는 유저의 이름, 이메일 정보 형식
 * - 애플은 최초 로그인 시에만 유저정보를 전달하는 정책을 가지기 때문에 AsyncStorage 에 저장
 * #### 필드 타입
 * ##### userName
 * ```typescript
 * interface userName {
 *   familyName: '홍';
 *   givenName: '길동';
 *   middleName: null;
 *   namePrefix: null;
 *   nameSuffix: null;
 *   nickname: null;
 * }
 * ```
 * ##### email
 * ```typescript
 * type email = string | null
 * ```
 */
interface AppleUserInfo {
  userName: AppleUserNameParam;
  email: AppleUserEmail;
}

/** ### setAppleUserInfo()
 * - 최초 애플 로그인 성공 시 유저의 name, email 정보를 AsyncStorage 에 저장
 */
export async function setAppleUserInfoStorage(userName: AppleUserNameParam, email: AppleUserEmail) {
  const userInfo: AppleUserInfo = {userName, email};
  await AsyncStorage.setItem(APPLE_USER_KEY, JSON.stringify(userInfo));
}

/** ### getAppleUserInfoStorage()
 * - 이미 저장된 애플 로그인 유저 정보를 가쟈올 떄 사용
 */
export async function getAppleUserInfoStorage(): Promise<AppleUserInfo> {
  const prevUser = await AsyncStorage.getItem(APPLE_USER_KEY);
  const {userName, email} = JSON.parse(prevUser || '{}');
  return {userName, email};
}
