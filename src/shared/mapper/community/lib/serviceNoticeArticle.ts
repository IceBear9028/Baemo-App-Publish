import {Article} from '~/shared/mapper/community';
import {ServiceNoticeAuthorResponse} from '~/shared/mapper/userProfile/lib/serviceNoticeAuthor.ts';
import {UserProfile} from '~/shared/mapper/userProfile';

export type ServiceNoticeRoleResponse = 'BAEMO_ADMIN' | 'USER';

export interface ServiceNoticeArticleResponse {
  writerInfo: ServiceNoticeAuthorResponse;
  noticeInfo: {
    noticeId: number;
    title: string;
    content: string;
    thumbnailPath: string;
    updatedAt: string; //'2024-09-23T12:59:34.890Z'
    viewCount: number;
  };
}

interface BaseNoticeArticle extends Omit<Article, 'likes' | 'isLikedByUser' | 'editDate' | 'comments'> {}

/* ---------------- class ---------------- */

export class ServiceNoticeArticleStatus {
  readonly '200': string;
  constructor() {
    this['200'] = '배모 공지사항';
  }
}

export class ServiceNoticeRole {
  readonly BAEMO_ADMIN: string;
  readonly USER: string;

  static convertRole(resRole: ServiceNoticeRoleResponse) {
    switch (resRole) {
      case 'BAEMO_ADMIN':
        return 'BAEMO_ADMIN';
      default:
        return 'USER';
    }
  }

  constructor() {
    this.BAEMO_ADMIN = '운영자';
    this.USER = '회원';
  }
}

export class ServiceNoticeArticle implements BaseNoticeArticle {
  public id: number;
  public status: keyof ServiceNoticeArticleStatus;
  public title: string;
  public views: number;
  public image: string;
  public createDate: string;
  public author: Pick<UserProfile, 'profileImage' | 'name' | 'userId'>;
  public content: string;

  constructor(res: ServiceNoticeArticleResponse) {
    this.id = res.noticeInfo.noticeId;
    this.status = '200';
    this.title = res.noticeInfo.title;
    this.views = res.noticeInfo.viewCount;
    this.image = res.noticeInfo.thumbnailPath;
    this.createDate = res.noticeInfo.updatedAt;
    this.content = res.noticeInfo.content;
    this.author = {
      profileImage: res.writerInfo.writerProfileUrl,
      name: res.writerInfo.writerName,
      userId: NaN, // 임시로 추가
    };
  }
}
