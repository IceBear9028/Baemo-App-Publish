import {apiRequest} from '~/shared/fetch';
import {ServiceNoticeRole, ServiceNoticeRoleResponse} from '~/shared/mapper/community';
import {ServiceNoticeAuthor} from '~/shared/mapper/userProfile/lib/serviceNoticeAuthor.ts';
import {ServiceNoticeDetailArticle, ServiceNoticeDetailArticleResponse} from '~/shared/mapper/serviceNotice';

export interface ResNoticeDetailArticle {
  noticeDetail: ServiceNoticeDetailArticleResponse;
  role: ServiceNoticeRoleResponse;
}

export interface ResServiceDetailNotice {
  role: keyof ServiceNoticeRole;
  author: ServiceNoticeAuthor;
  detailArticle: ServiceNoticeDetailArticle;
}

export async function fetchGetDetailNoticeArticle(articleId: number): Promise<ResServiceDetailNotice> {
  const {data} = await apiRequest<ResNoticeDetailArticle>(`api/notice/${articleId}`, 'get');
  return {
    role: ServiceNoticeRole.convertRole(data.payload.role),
    author: new ServiceNoticeAuthor(data.payload.noticeDetail.writerInfo),
    detailArticle: new ServiceNoticeDetailArticle(data.payload.noticeDetail),
  };
}
