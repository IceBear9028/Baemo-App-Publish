import {ArticleCommunityStatus, ArticleList, ArticleResponse} from '~/shared/mapper/community';
import {apiRequest_TEMP} from '~/shared/fetch';

export type ArticleCommunityCategoryId = keyof ArticleCommunityStatus;

/** 모임에서 작성된 글을 가져옴
 */
export async function fetchGetCommunityCategoryArticle(categoryId: ArticleCommunityCategoryId) {
  const fetchUrl = `article?&status=${categoryId}`;
  return new Promise<ArticleList>(resolve => {
    setTimeout(async () => {
      const {data} = await apiRequest_TEMP<ArticleResponse[]>(fetchUrl, 'get');
      resolve(new ArticleList(data));
    });
  });
}
