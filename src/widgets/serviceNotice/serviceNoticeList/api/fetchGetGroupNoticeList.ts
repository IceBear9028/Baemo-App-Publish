import {apiRequest} from '~/shared/fetch';
import {ServiceNoticeArticle, ServiceNoticeArticleResponse, ServiceNoticeRole, ServiceNoticeRoleResponse} from '~/shared/mapper/community';

interface NoticeArticleResponse {
  notices: ServiceNoticeArticleResponse[];
  role: ServiceNoticeRoleResponse;
}

export interface GroupNoticeResponse {
  noticeList: ServiceNoticeArticle[];
  role: keyof ServiceNoticeRole;
}

export async function fetchGetGroupNoticeList(): Promise<GroupNoticeResponse> {
  const {data} = await apiRequest<NoticeArticleResponse>('api/notice/all', 'get');
  return {
    noticeList: data.payload.notices.map(postRes => new ServiceNoticeArticle(postRes)),
    role: ServiceNoticeRole.convertRole(data.payload.role),
  };
}
