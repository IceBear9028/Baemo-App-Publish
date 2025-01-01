import {apiRequest} from '~/shared/fetch';

export interface ReqDeleteComment {
  postId: number;
  commentId: number;
}

export async function fetchDeleteGroupComment(req: ReqDeleteComment) {
  const {postId, commentId} = req;
  const {data} = await apiRequest(`api/clubs/post/${postId}/comment/${commentId}`, 'delete');
  return data;
}
