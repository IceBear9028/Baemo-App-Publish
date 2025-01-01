import {apiRequest} from '~/shared/fetch';

export interface ReqPostComment {
  postId: number;
  // preRepliesId: number | null;
  depth: number;
  preCommentId: number | null;
  commentContent: string;
}

interface ResComment {
  postId: number;
  preRepliesId: number;
  repliesContent: string;
}

export async function fetchPostGroupComment(req: ReqPostComment) {
  const {postId, ...request} = req;
  return await apiRequest<ResComment>(`api/clubs/post/${postId}/comment`, 'post', request as any);
}
