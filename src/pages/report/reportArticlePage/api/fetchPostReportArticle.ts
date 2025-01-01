import {apiRequest} from '~/shared/fetch';

export interface ReqReportByArticle {
  postId: number;
  reasons: string[];
  description: string;
}

export async function fetchPostReportArticle(reqBody: ReqReportByArticle) {
  const {data} = await apiRequest('api/report/post', 'post', reqBody);
  return data;
}
