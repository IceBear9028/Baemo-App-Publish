import {ArticleList, ArticleResponse} from '~/shared/mapper/community';
import {apiRequest_TEMP} from '~/shared/fetch';

export async function fetchGetFeedList() {
  const fetchUrl = 'article';
  return new Promise<ArticleList>(resolve => {
    setTimeout(async () => {
      const {data} = await apiRequest_TEMP<ArticleResponse[]>(fetchUrl, 'get');
      resolve(new ArticleList(data));
    });
  });
}
