import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {Platform} from 'react-native';

const TEMP_BASE_URL = Platform.OS === 'ios' ? 'http://localhost:3000/' : 'http://10.0.2.2:3000/';
const axiosInstance = axios.create({baseURL: TEMP_BASE_URL, withCredentials: true});

/**
 * 공통 비동기 처리 요청을 하는 메소드
 * axios 라이브러리를 사용
 * @param url required rest fetch 요청 주소(required)
 * @param method 요청 메소드
 * @param params 요청 파라미터
 * @param config axios 설정값
 * @return Promise<ResponseData> 응답 결과
 */
export async function apiRequest_TEMP<ResponseData, RequestParams = undefined>(
  url: string,
  method: Method,
  params?: RequestParams,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<ResponseData>> {
  const axiosConfig = setAxiosConfig<RequestParams>(url, method, params, config);
  const response = await axiosInstance(axiosConfig);
  return {...response};
}

function setAxiosConfig<RequestParams>(url: string, method: Method, params?: RequestParams, config?: AxiosRequestConfig) {
  const headers = {};
  return {
    method,
    url,
    ...(params && {params}),
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
}
