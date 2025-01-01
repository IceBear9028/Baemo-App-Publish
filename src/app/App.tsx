import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '../../config/gluestack-ui.config.ts'; // Optional if you want to use default theme
import {DefaultTheme, Theme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {MainNavigator} from '~/app/navigation/main';
import {LoginNavigator} from '~/app/navigation/login';
import {useCheckAuth} from 'shared/authentication';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ToastProvider} from '~/shared/notification';
import {useAxiosInterceptor} from '~/shared/fetch';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import SplashScreen from 'react-native-splash-screen';
import CodePush from 'react-native-code-push';
import {CheckCodePushModal, useCheckCodePush} from '~/widgets/codepush';
import {CheckAppUpdateModal, useAppVersionCheck} from '~/shared/versionCheck';
import {useDeeplink} from '~/shared/deeplink/useDeeplink.ts';

const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    primary: '#10B981',
  },
};

/**
 * ErrorBoundary 가 안정화되면 모든 queryClient 를 다음 코드로 변경할 것
 * ````typescript
 * const queryClient = new QueryClient({
 *   defaultOptions: {
 *     queries: {
 *       throwOnError: true,
 *     },
 *   },
 * });
 * ````
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
    mutations: {},
  },
});

function App(): React.JSX.Element {
  const {isAuth} = useCheckAuth();
  useDeeplink();
  useAxiosInterceptor();
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); //스플래시 활성화 시간
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GluestackUIProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <BottomSheetModalProvider>
            <StyledGlobalContainer>
              <KeyboardProvider>
                <CheckCodePushModal />
                <CheckAppUpdateModal />
                <SafeAreaProvider>{isAuth ? <MainNavigator theme={AppTheme} /> : <LoginNavigator theme={AppTheme} />}</SafeAreaProvider>
              </KeyboardProvider>
            </StyledGlobalContainer>
          </BottomSheetModalProvider>
        </QueryClientProvider>
      </GluestackUIProvider>
      {/* Toast Message Component */}
      <ToastProvider />
    </GestureHandlerRootView>
  );
}

const StyledGlobalContainer = styled.View`
  flex: 1;
`;

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  updateDialog: {
    title: 'Baemo 업데이트 알림',
    optionalUpdateMessage: '유저분들의 의견을 반영해서 사용성을 개선했어요!\n 업데이트를 진행할까요?',
    optionalInstallButtonLabel: '업데이트',
    optionalIgnoreButtonLabel: '아니요.',
  },
  installMode: CodePush.InstallMode.IMMEDIATE,
};

export default App;
