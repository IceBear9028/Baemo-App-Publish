import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {BaemoBaseUrl} from '../const/urls';
import {ApiCode} from '~/shared/fetch';

export const axiosInstance = axios.create({
  baseURL: BaemoBaseUrl,
  headers: {
    'content-type': 'application/json',
    accept: 'application/json,',
  },
  withCredentials: true,
});

export interface CommonRes<Response> {
  code: ApiCode;
  payload: Response;
}

/**
 * 공통 비동기 처리 요청을 하는 메소드
 * axios 라이브러리를 사용
 * @param url required rest fetch 요청 주소(required)
 * @param method 요청 메소드
 * @param data 요청 body
 * @param params 요청 params
 * @param config axios 설정값
 * @return Promise<ResponseData> 응답 결과
 */
export async function apiRequest<ResponseData = unknown, RequestBody = undefined, RequestParams = undefined>(
  url: string,
  method: Method,
  data?: RequestBody,
  params?: RequestParams,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<CommonRes<ResponseData>>> {
  console.log('request --->', data);
  const axiosConfig = setAxiosConfig<RequestBody, RequestParams>(url, method, data, params, config);
  const response = await axiosInstance<CommonRes<ResponseData>>(axiosConfig);
  return {...response};
}

export async function apiFormRequest<ResponseData = unknown>(
  url: string,
  method: Method,
  formData: FormData,
): Promise<AxiosResponse<CommonRes<ResponseData>>> {
  console.log('request --->', formData);
  const axiosConfig = setAxiosFormConfig(url, method, formData);
  return await axiosInstance<CommonRes<ResponseData>>(axiosConfig);
}

function setAxiosConfig<RequestData, RequestParams>(
  url: string,
  method: Method,
  data?: RequestData,
  params?: RequestParams,
  config?: AxiosRequestConfig,
) {
  const headers = {};
  return {
    method,
    url,
    ...(data && {data}),
    ...(params && {params}),
    ...config,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
  };
}

function setAxiosFormConfig<RequestData>(url: string, method: Method, data?: RequestData) {
  return {
    method,
    url,
    ...(data && {data}),
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
}
