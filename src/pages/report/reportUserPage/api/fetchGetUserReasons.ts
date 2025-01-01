import {apiRequest} from '~/shared/fetch';

export interface ResArticleReasons {
  reason: string;
  description: string;
}

export async function fetchGetUserReasons() {
  const {data} = await apiRequest<ResArticleReasons[]>('api/report/user/reasons', 'get');
  return data.payload;
}
