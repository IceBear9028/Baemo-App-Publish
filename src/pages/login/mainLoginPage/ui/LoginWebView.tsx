import {useRef} from 'react';
import {Dimensions} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootLoginStackParamList} from '~/shared/route';
import {useAuthControl} from '~/shared/authentication';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type LoginWebViewProps = {} & NativeStackScreenProps<RootLoginStackParamList, 'socialLogin'>;

export const LoginWebView = ({route, navigation}: LoginWebViewProps) => {
  const webviewRef = useRef(null);
  const {activeAuth} = useAuthControl();

  // 웹뷰에서 메시지를 받을 때 실행되는 함수
  const handleMessage = (event: WebViewMessageEvent) => {
    console.log('Received header:', event.nativeEvent.data);
  };

  return (
    <StyledContainer>
      <WebView
        ref={webviewRef}
        style={{flex: 1, width: windowWidth, height: windowHeight}}
        source={{uri: route.params.uri}}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        onNavigationStateChange={activeAuth}
        onMessage={handleMessage}
        injectedJavaScript={`
          (function() {
            // XMLHttpRequest를 사용하여 서버 요청을 가로채고 응답 헤더를 가져옴
            var open = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function() {
              this.addEventListener('load', function() {
                if (this.readyState === 4) {
                  // 헤더 정보를 문자열로 변환하여 React Native로 전달
                  window.ReactNativeWebView.postMessage(JSON.stringify(this.getAllResponseHeaders()));
                }
              });
              open.apply(this, arguments);
            };
          })();
        `}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
