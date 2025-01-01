import {apiRequest} from '~/shared/fetch';

export interface PostCommentReq {
  title: string;
  content: string;
  category: string;
  imageList: string[];
}

interface ResComment {}

export async function fetchPostComment(req: PostCommentReq) {
  return await apiRequest<ResComment, PostCommentReq>('api/comment', 'post', req);
}
