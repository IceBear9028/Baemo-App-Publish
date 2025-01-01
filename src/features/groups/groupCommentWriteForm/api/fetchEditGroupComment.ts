import {apiRequest} from '~/shared/fetch';

export interface ReqEditComment {
  postId: number;
  commentId: number;
  newCommentContent: string;
}

export async function fetchEditGroupComment(req: ReqEditComment) {
  const {postId, commentId, newCommentContent} = req;
  const {data} = await apiRequest(`api/clubs/post/${postId}/comment/${commentId}`, 'put', {newCommentContent});
  return data;
}
