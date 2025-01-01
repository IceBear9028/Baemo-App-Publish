import {useEffect} from 'react';
import {AxiosError} from 'axios';
import {useAuthControl} from '~/shared/authentication';
import {getToken} from '~/shared/authentication/lib/settingToken.ts';
import {axiosInstance, CommonRes} from '~/shared/fetch/model/apiRequest.ts';
import {Alert} from 'react-native';

export function useAxiosInterceptor() {
  const {deactivateAuthToken} = useAuthControl();
  const requestInterceptor = axiosInstance.interceptors.request.use(
    async config => {
      try {
        const {token} = await getToken();
        if (token) {
          config.headers.authorization = token.authorization;
        }
      } catch (error) {
        console.error('Error getting token:', error);
      }
      return config;
    },
    error => Promise.reject(error),
  );

  const responseInterceptor = axiosInstance.interceptors.response.use(
    response => {
      console.log(`response [${response?.data.code}] ------->`, response?.data);
      try {
        if (response?.headers.authorization) {
        }
      } catch (error) {
        console.error('Error getting response token :', error);
      }
      return response;
    },
    (error: AxiosError<CommonRes<unknown>>) => {
      console.log(`error response [${error.response?.data.code}]  ---->`, error.response?.data);
      if (error.response?.data.code === 'AUTH-01') {
        deactivateAuthToken();
        Alert.alert('로그인 만료', '다시 로그인 해주세요.', [{text: '확인'}]);
        return;
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor]);
}
