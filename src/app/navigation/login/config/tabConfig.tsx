import React from 'react';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {SignupBackButton} from '../ui/signupBackButton.tsx';
import {BackButton} from '~/shared/ui';
import {NavigateMainLoginButton} from '../ui/navigateMainLoginButton.tsx';
import {InputProfilePageBackButton, SkipEditProfileButton} from '~/pages/login/inputProfilePage';

export const commonLoginTabConfig: NativeStackNavigationOptions = {
  headerShadowVisible: false,
  headerTitle: '',
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <BackButton />;
  },
};

export const signUpCancelTabConfig: NativeStackNavigationOptions = {
  headerShadowVisible: false,
  headerTitle: '',
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <SignupBackButton />;
  },
};

export const successSignUpTabConfig: NativeStackNavigationOptions = {
  headerShadowVisible: false,
  headerTitle: '',
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <NavigateMainLoginButton />;
  },
};

export const inputProfilePageConfig: NativeStackNavigationOptions = {
  headerShadowVisible: false,
  headerTitle: '',
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <InputProfilePageBackButton />;
  },
  headerRight: () => {
    return <SkipEditProfileButton />;
  },
};

export const TermsOfServiceWebViewConfig: NativeStackNavigationOptions = {
  headerShadowVisible: false,
  headerTitle: 'BAEMO 이용약관 동의',
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <BackButton />;
  },
};
