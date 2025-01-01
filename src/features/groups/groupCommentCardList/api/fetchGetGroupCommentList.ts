import {apiRequest} from '~/shared/fetch';
import {GroupArticleComment, GroupArticleCommentResponse} from '~/shared/mapper/groups';

interface ResGroupCommentList {
  list: GroupArticleCommentResponse[];
}

export async function fetchGetGroupCommentList(articleId: number) {
  const {data} = await apiRequest<ResGroupCommentList>(`api/clubs/post/${articleId}/comment`, 'get');
  return data.payload.list.map(resComm => new GroupArticleComment(resComm));
}
