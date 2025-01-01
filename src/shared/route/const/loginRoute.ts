import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {DuplicateAccount} from '~/shared/mapper/login';

export const loginRoutePath = {
  loginPage: 'loginPage',
  passwordLoginPage: 'passwordLoginPage',
  signUpPage: 'signUpPage',
  inputAuthPage: 'inputAuthPage',
  inputUserInfoPage: 'inputUserInfoPage',
  inputSocialUserInfoPage: 'inputSocialUserInfoPage',
  inputProfilePage: 'inputProfilePage',
  successSignUpPage: 'successSignUpPage',
  socialLogin: 'socialLogin',
  findPasswordPage: 'findPasswordPage',
  findPasswordAuthCodePage: 'findPasswordAuthCodePage',
  findPasswordResetPage: 'findPasswordResetPage',
  termsOfServiceWebViewPage: 'termsOfServiceWebViewPage',
  duplicateAccountPage: 'duplicateAccountPage',
};

/** React Navigation 의 Stack 페이지 이동 간 파라미터 type
 * - Stack 페이지 이동 시 react-navigation 의 route 객체 타입을 지정
 */
export type RootLoginStackParamList = {
  loginPage: undefined;
  passwordLoginPage: undefined;
  signUpPage: undefined;
  inputAuthPage: {
    phone: string;
  };
  inputUserInfoPage: undefined;
  inputProfilePage: undefined;
  inputSocialUserInfoPage: undefined;
  findPasswordPage: undefined;
  findPasswordAuthCodePage: {
    phone: string;
  };
  findPasswordResetPage: {
    phone: string;
  };
  socialLogin: {
    uri: string;
  };
  successSignUpPage: undefined;
  termsOfServiceWebViewPage: {
    url: string;
  };
  duplicateAccountPage: DuplicateAccount;
} & ParamListBase;

/** React Navigation useNavigation() 전용 파라미터 type
 * - useLoginNavigate() 전용 타입
 */
export type RootLoginStackNavigationProp = NativeStackNavigationProp<RootLoginStackParamList>;
