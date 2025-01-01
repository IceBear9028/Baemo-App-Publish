import React from 'react';
import {loginRoutePath, RootLoginStackParamList} from '~/shared/route';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  commonLoginTabConfig,
  inputProfilePageConfig,
  signUpCancelTabConfig,
  successSignUpTabConfig,
  TermsOfServiceWebViewConfig,
} from '../config/tabConfig.tsx';
import {LoginWebView} from '~/pages/login/mainLoginPage/ui/LoginWebView.tsx';
import {MainLoginPage} from '~/pages/login/mainLoginPage';
import {PersonalAuthPage} from '~/pages/login/personalAuthPage';
import {InputAuthCodePage} from '~/pages/login/inputAuthCodePage';
import {InputUserInfoPage} from '~/pages/login/InputUserInfoPage';
import {SuccessSignUpPage} from '~/pages/login/successSignUpPage';
import {FindPasswordPage} from '~/pages/login/findPasswordPage';
import {FindPasswordAuthCodePage} from '~/pages/login/findPasswordAuthCodePage';
import {FindPasswordResetPage} from '~/pages/login/findPasswordResetPage';
import {DuplicateAccountPage} from '~/pages/login/duplicateAccountPage';
import {PasswordLoginPage} from '~/pages/login/passwordLoginPage';
import {InputSocialUserInfoPage} from '~/pages/login/InputSocialUserInfoPage';
import {TermsOfServiceWebView} from '~/pages/login/termsOfServiceWebViewPage';
import {InputProfilePage} from '~/pages/login/inputProfilePage';

interface LoginNavigationProps {
  theme: Theme;
}

const LoginStack = createNativeStackNavigator<RootLoginStackParamList>();

export const LoginNavigator = ({theme}: LoginNavigationProps) => {
  return (
    <NavigationContainer theme={theme}>
      <LoginStack.Navigator screenOptions={{headerBackTitleVisible: false}}>
        {/*0. 로그인 페이지*/}
        <LoginStack.Group>
          <LoginStack.Screen name={loginRoutePath.loginPage} options={{headerShown: false}} component={MainLoginPage} />
          <LoginStack.Screen name={loginRoutePath.socialLogin} component={LoginWebView as any} />
          <LoginStack.Screen name={loginRoutePath.passwordLoginPage} options={commonLoginTabConfig} component={PasswordLoginPage} />
        </LoginStack.Group>

        {/*1. 회원가입 페이지*/}
        <LoginStack.Group>
          <LoginStack.Screen name={loginRoutePath.signUpPage} options={signUpCancelTabConfig} component={PersonalAuthPage} />
          <LoginStack.Screen
            name={loginRoutePath.inputAuthPage as 'inputAuthPage'}
            options={commonLoginTabConfig}
            component={InputAuthCodePage}
          />
          <LoginStack.Screen
            name={loginRoutePath.inputSocialUserInfoPage}
            options={signUpCancelTabConfig}
            component={InputSocialUserInfoPage}
          />
          <LoginStack.Screen name={loginRoutePath.inputUserInfoPage} options={signUpCancelTabConfig} component={InputUserInfoPage} />
          <LoginStack.Screen name={loginRoutePath.successSignUpPage} options={successSignUpTabConfig} component={SuccessSignUpPage} />
          <LoginStack.Screen
            name={loginRoutePath.duplicateAccountPage as 'duplicateAccountPage'}
            options={signUpCancelTabConfig}
            component={DuplicateAccountPage}
          />
          <LoginStack.Screen
            name={loginRoutePath.termsOfServiceWebViewPage as 'termsOfServiceWebViewPage'}
            options={TermsOfServiceWebViewConfig}
            component={TermsOfServiceWebView}
          />
          <LoginStack.Screen name={loginRoutePath.inputProfilePage} options={inputProfilePageConfig} component={InputProfilePage} />
        </LoginStack.Group>

        {/*2. 회원정보 찾기 페이지*/}
        <LoginStack.Group>
          <LoginStack.Screen name={loginRoutePath.findPasswordPage} options={commonLoginTabConfig} component={FindPasswordPage} />
          <LoginStack.Screen
            name={loginRoutePath.findPasswordAuthCodePage as 'findPasswordAuthCodePage'}
            options={commonLoginTabConfig}
            component={FindPasswordAuthCodePage}
          />
          <LoginStack.Screen
            name={loginRoutePath.findPasswordResetPage as 'findPasswordResetPage'}
            options={commonLoginTabConfig}
            component={FindPasswordResetPage}
          />
        </LoginStack.Group>
      </LoginStack.Navigator>
    </NavigationContainer>
  );
};
