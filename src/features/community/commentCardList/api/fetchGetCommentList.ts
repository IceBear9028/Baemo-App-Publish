import {Comment, CommentItemResponse, CommentList} from '~/shared/mapper/community';
import {apiRequest_TEMP} from '~/shared/fetch';

export async function fetchGetCommentList(articleId?: number) {
  return new Promise<Comment[]>(resolve => {
    setTimeout(async () => {
      const {data} = await apiRequest_TEMP<CommentItemResponse[]>('comments', 'get');
      resolve(CommentList.convert(data));
    });
  });
}
