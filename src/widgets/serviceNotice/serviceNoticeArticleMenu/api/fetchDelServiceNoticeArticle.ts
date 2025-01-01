import {apiRequest} from '~/shared/fetch';

export async function fetchDelServiceNoticeArticle(articleId: number) {
  const {data} = await apiRequest(`api/notice/${articleId}`, 'delete');
  return data;
}
