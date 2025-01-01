import {ServiceNoticeAuthorResponse} from '~/shared/mapper/userProfile';
import {DetailArticle, ServiceNoticeArticleStatus} from '~/shared/mapper/community';

export interface ServiceNoticeArticleImageResponse {
  path: string;
  orderNumber: number;
  isThumbnail: boolean;
}

export interface ServiceNoticeDetailArticleResponse {
  writerInfo: ServiceNoticeAuthorResponse;
  noticeInfo: {
    noticeId: number;
    title: string;
    content: string;
    thumbnailPath: string;
    updatedAt: string; //'2024-09-23T12:59:34.890Z'
    viewCount: number;
  };
  images: ServiceNoticeArticleImageResponse[];
}

type BaseServiceNoticeArticle = Omit<DetailArticle<ServiceNoticeArticleImageResponse>, 'permission' | 'isLikedByUser' | 'likes'>;

export class ServiceNoticeDetailArticle implements BaseServiceNoticeArticle {
  // 개발자 계정이면 공지사항 아무나 변경 가능
  readonly articleId: number;
  public status: keyof ServiceNoticeArticleStatus;
  public title: string;
  public views: number;
  public createDate: string;
  public editDate: string;
  public readonly contentAll: string;
  public readonly imageAll: ServiceNoticeArticleImageResponse[];

  constructor(res: ServiceNoticeDetailArticleResponse) {
    this.status = '200';
    this.title = res.noticeInfo.title;
    this.views = res.noticeInfo.viewCount;
    this.createDate = res.noticeInfo.updatedAt;
    this.editDate = res.noticeInfo.updatedAt;
    this.contentAll = res.noticeInfo.content;
    this.articleId = res.noticeInfo.noticeId;
    this.imageAll = res.images;
  }
}
