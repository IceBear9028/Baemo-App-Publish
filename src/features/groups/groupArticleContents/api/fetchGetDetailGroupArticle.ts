import {apiRequest} from '~/shared/fetch';
import {GroupArticleAuthor, GroupAuthorResponse} from '~/shared/mapper/userProfile';
import {GroupDetailArticle, GroupDetailArticleResponse} from '~/shared/mapper/groups';

export interface ResDetailArticle extends GroupDetailArticleResponse, GroupAuthorResponse {}

export interface ResGroupDetailArticle {
  author: GroupArticleAuthor;
  article: GroupDetailArticle;
}

export async function fetchGetDetailGroupArticle(groupsId: number, articleId: number): Promise<ResGroupDetailArticle> {
  const {data} = await apiRequest<ResDetailArticle>(`api/clubs/${groupsId}/post/${articleId}`, 'get');
  const {writerId, writerName, writerThumbnail, ...articleResponse} = data.payload;
  return {
    author: new GroupArticleAuthor({writerId, writerName, writerThumbnail}),
    article: new GroupDetailArticle(articleResponse),
  };
}
