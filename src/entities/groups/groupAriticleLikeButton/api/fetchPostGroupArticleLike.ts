import {Groups} from '~/shared/mapper/groups';
import {GroupArticle} from '~/shared/mapper/groups';
import {apiRequest} from '~/shared/fetch';

export interface ReqArticleLike extends Pick<Groups, 'groupsId'>, Pick<GroupArticle, 'id'> {}

export async function fetchPostGroupArticleLike({groupsId, id}: ReqArticleLike) {
  const {data} = await apiRequest<{}>(`api/clubs/${groupsId}/post/${id}/like`, 'post');
  return data;
}
