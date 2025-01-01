import {apiRequest_TEMP} from '~/shared/fetch';
import {ArticleList, ArticleResponse} from '~/shared/mapper/community';

export type MyArticleTimePeriod = '1_week' | '1_month' | '3_month';

/** 모임에서 작성된 글을 가져옴
 */
export async function fetchGetMyArticle(categoryId: MyArticleTimePeriod) {
  const fetchUrl = categoryId === '1_week' ? 'article?_limit=5' : categoryId === '1_month' ? 'article?_limit=5' : 'article';
  return new Promise<ArticleList>(resolve => {
    setTimeout(async () => {
      const {data} = await apiRequest_TEMP<ArticleResponse[]>(fetchUrl, 'get');
      resolve(new ArticleList(data));
    });
  });
}
