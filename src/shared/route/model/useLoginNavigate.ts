import {useNavigation} from '@react-navigation/native';
import {loginRoutePath} from '~/shared/route';
import {RootLoginStackNavigationProp} from '~/shared/route/const/loginRoute.ts';
import {DuplicateAccount} from '~/shared/mapper/login';

export function useLoginNavigate() {
  const navigation = useNavigation<RootLoginStackNavigationProp>();

  function navigateLogin() {
    navigation.navigate(loginRoutePath.loginPage);
  }

  function navigatePasswordLogin() {
    navigation.navigate(loginRoutePath.passwordLoginPage);
  }

  function navigateSignup() {
    navigation.navigate(loginRoutePath.signUpPage);
  }

  function navigateInputAuthNumber(phone: string) {
    navigation.navigate(loginRoutePath.inputAuthPage, {phone});
  }

  function navigateInputUserInfoPage() {
    navigation.navigate(loginRoutePath.inputUserInfoPage);
  }

  function navigateInputSocialUserInfoPage() {
    navigation.navigate(loginRoutePath.inputSocialUserInfoPage);
  }

  function navigateSocialLogin(socialUri: string) {
    navigation.navigate(loginRoutePath.socialLogin, {uri: socialUri});
  }

  function navigateSuccessSignUp() {
    navigation.navigate(loginRoutePath.successSignUpPage);
  }

  function navigateFindPasswordAuthCode(phone: string) {
    navigation.navigate(loginRoutePath.findPasswordAuthCodePage, {phone});
  }

  function navigateFindPassword() {
    navigation.navigate(loginRoutePath.findPasswordPage);
  }

  function navigateFindPasswordReset(phone: string) {
    navigation.navigate(loginRoutePath.findPasswordResetPage, {phone});
  }

  function navigateTermsOfServiceWebView(url: string) {
    navigation.navigate(loginRoutePath.termsOfServiceWebViewPage, {url});
  }

  function navigateDuplicateAccount(input: DuplicateAccount) {
    navigation.navigate(loginRoutePath.duplicateAccountPage, input);
  }

  function navigateInputProfile() {
    navigation.navigate(loginRoutePath.inputProfilePage);
  }

  return {
    navigateLogin,
    navigatePasswordLogin,
    navigateSignup,
    navigateInputAuthNumber,
    navigateInputUserInfoPage,
    navigateSocialLogin,
    navigateSuccessSignUp,
    navigateFindPassword,
    navigateFindPasswordAuthCode,
    navigateFindPasswordReset,
    navigateTermsOfServiceWebView,
    navigateDuplicateAccount,
    navigateInputProfile,
    navigateInputSocialUserInfoPage,
  };
}
