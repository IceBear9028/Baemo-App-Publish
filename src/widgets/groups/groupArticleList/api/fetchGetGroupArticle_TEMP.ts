import {ArticleList, ArticleResponse} from '~/shared/mapper/community';
import {ArticleGroupStatus} from '~/shared/mapper/groups';
import {apiRequest_TEMP} from '~/shared/fetch';

export type ArticleGroupCategoryId = 'all' | keyof ArticleGroupStatus;

/** 모임에서 작성된 글을 가져옴
 */
export async function fetchGetGroupArticle_TEMP(categoryId: ArticleGroupCategoryId) {
  const fetchUrl = categoryId === 'all' ? 'article?&status_lte=100' : `article?&status=${categoryId}`;
  return new Promise<ArticleList>(resolve => {
    setTimeout(async () => {
      const {data} = await apiRequest_TEMP<ArticleResponse[]>(fetchUrl, 'get');
      resolve(new ArticleList(data));
    });
  });
}
