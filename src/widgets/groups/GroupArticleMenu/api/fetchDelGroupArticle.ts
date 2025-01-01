import {apiRequest} from '~/shared/fetch';

export interface ReqDelGroupArticle {
  groupsId: number;
  articleId: number;
}

export async function fetchDelGroupArticle({groupsId, articleId}: ReqDelGroupArticle) {
  const {data} = await apiRequest(`/api/clubs/post/${articleId}/clubsId/${groupsId}`, 'delete');
  return data;
}
