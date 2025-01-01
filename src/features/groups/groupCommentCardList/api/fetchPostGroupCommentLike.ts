import {apiRequest} from '~/shared/fetch';

export interface ReqGroupCommentLike {
  postId: number;
  commentId: number;
}

export async function fetchPostGroupCommentLike(req: ReqGroupCommentLike) {
  const {postId, commentId} = req;
  const {data} = await apiRequest(`api/clubs/post/${postId}/comment/${commentId}/like`, 'patch');
  return data;
}
