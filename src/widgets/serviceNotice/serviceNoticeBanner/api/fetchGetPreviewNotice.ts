import {apiRequest} from '~/shared/fetch';
import {ServiceNoticeArticle, ServiceNoticeArticleResponse} from '~/shared/mapper/community';

export async function fetchGetPreviewNotice() {
  const {data} = await apiRequest<ServiceNoticeArticleResponse[]>('api/notice/home', 'get');
  return data.payload.map(notice => new ServiceNoticeArticle(notice));
}
