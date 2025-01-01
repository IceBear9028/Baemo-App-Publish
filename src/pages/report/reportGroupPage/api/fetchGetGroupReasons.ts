import {apiRequest} from '~/shared/fetch';

export interface ResArticleReasons {
  reason: string;
  description: string;
}

export async function fetchGetGroupReasons() {
  const {data} = await apiRequest<ResArticleReasons[]>('api/report/club/reasons', 'get');
  return data.payload;
}
