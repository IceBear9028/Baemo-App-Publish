import App from '~/app/App';
import {name as appName} from './app.json';
import {Text, TextInput} from 'react-native';
import {LogBox, AppRegistry} from 'react-native';
import NaverLogin from '@react-native-seoul/naver-login';
import {NaverApiKey, NaverApiSecret} from '~/shared/fetch';

// 네이버 로그인 관련 환경변수 설정
const serviceUrlSchemeIOS = 'baemonaverlogin';

// Text 적용 : 시스템 텍스트 크기를 무시하고 앱에서 지정한 크기를 사용함.
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

// TextInput 적용 : 시스템 텍스트 크기를 무시하고 앱에서 지정한 크기를 사용함.
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

// LogBox 메시지 변경
const ignoreMessages = ['Request', 'WARN  If you do not provide children'];
LogBox.ignoreLogs(ignoreMessages); // Ignore log notification by message

// 네이버 로그인 설정
NaverLogin.initialize({
  appName,
  consumerKey: NaverApiKey,
  consumerSecret: NaverApiSecret,
  serviceUrlSchemeIOS,
  disableNaverAppAuthIOS: true,
});

// App 번들링 코드
function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null;
  }
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
