import {KakaoFeedTemplate, KakaoLocationTemplate, KakaoTemplateContent} from '@react-native-kakao/share';

interface KakaoFeedShareButtonProps {
  template: KakaoFeedTemplate;
  useWebBrowserIfKakaoTalkNotAvailable?: boolean;
  serverCallbackArgs?: Record<string, string>;
}

interface KakaoLocationShareButtonProps {
  template: KakaoLocationTemplate;
  useWebBrowserIfKakaoTalkNotAvailable?: boolean;
  serverCallbackArgs?: Record<string, string>;
}

export const convertDomainDataToFeedTemplate = (shareContent: KakaoTemplateContent): KakaoFeedShareButtonProps => {
  const template: KakaoFeedTemplate = {
    buttonTitle: '배모 앱으로 이동하기',
    content: shareContent,
  };
  return {template: template, useWebBrowserIfKakaoTalkNotAvailable: true};
};

export const convertDomainDataToLocationTemplate = (shareContent: KakaoTemplateContent, address: string): KakaoLocationShareButtonProps => {
  const template: KakaoLocationTemplate = {
    buttonTitle: '배모 앱으로 이동',
    address: address,
    content: shareContent,
  };
  return {template: template, useWebBrowserIfKakaoTalkNotAvailable: true};
};
