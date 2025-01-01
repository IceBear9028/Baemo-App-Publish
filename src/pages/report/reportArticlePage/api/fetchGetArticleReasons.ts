import {apiRequest} from '~/shared/fetch';

export interface ResArticleReasons {
  reason: string;
  description: string;
}

export async function fetchGetArticleReasons() {
  const {data} = await apiRequest<ResArticleReasons[]>('api/report/post/reasons', 'get');
  return data.payload;
}
