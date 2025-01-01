declare module 'react-native-config' {
  export interface NativeConfig {
    BUILD_MODE?: string;
    API_URL?: string;
    KAKAO_API_KEY?: string;
    NAVER_API_KEY?: string;
    NAVER_API_SECRET?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
