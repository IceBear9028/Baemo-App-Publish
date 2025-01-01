import {Article, ArticleStatus} from '~/shared/mapper/community';
import {GroupArticleAuthor, UserProfile} from '~/shared/mapper/userProfile';

export type CommunityArticleResponseType = 'DAILY' | 'RECRUITMENT_EXERCISE' | 'PROMOTION_CLUB' | 'RECRUITMENT_PARTNER' | 'COMPETITION';
export type CommunityArticleType = 'DAILY' | 'RECRUITMENT_EXERCISE' | 'PROMOTION_CLUB' | 'RECRUITMENT_PARTNER' | 'COMPETITION';

export class ArticleCommunityStatus {
  readonly '100': string;
  readonly '101': string;
  readonly '102': string;
  readonly '103': string;
  readonly '104': string;
  constructor() {
    this['100'] = '일상';
    this['101'] = '운동 모집';
    this['102'] = '모임 홍보';
    this['103'] = '파트너 모집';
    this['104'] = '대회 공지';
  }

  /** ### convertType()
   * #### 사용용도
   * 프론트에서 사용하던 status 를 다시 백엔드 code 로 변환하는 함수
   */
  static convertType(input: keyof ArticleCommunityStatus) {
    const statusType: {[index in keyof ArticleCommunityStatus]: CommunityArticleResponseType} = {
      '100': 'DAILY',
      '101': 'RECRUITMENT_EXERCISE',
      '102': 'PROMOTION_CLUB',
      '103': 'RECRUITMENT_PARTNER',
      '104': 'COMPETITION',
    };
    return statusType[input];
  }

  static convertStatus(input: CommunityArticleResponseType) {
    const statusCode: {[index in CommunityArticleResponseType]: keyof ArticleCommunityStatus} = {
      DAILY: '100',
      RECRUITMENT_EXERCISE: '101',
      PROMOTION_CLUB: '102',
      RECRUITMENT_PARTNER: '103',
      COMPETITION: '104',
    };
    return statusCode[input];
  }
}

export interface CommunityArticleNormalResponse {
  clubsPostId: number;
  title: string;
  type: CommunityArticleResponseType;
  thumbnailPath: string;
  likeCount: number;
  viewCount: number;
  isLikedByUser: boolean;
  repliesCount: number;
  content: string;
  createdAt: string;
  writerId: number;
  nickname: string;
  profileImage: string;
}

export interface CommunityArticleNoticeResponse {
  clubsPostId: number;
  title: string;
  content: string;
  createdAt: string;
  likeCount: number;
  repliesCount: number;
  type: CommunityArticleResponseType;
}

///// 클래스 코드들

// export class CommunityArticle extends Article {
//   id: number;
//   status: keyof ArticleStatus;
//   title: string;
//   image: string | null;
//   comments: number;
//   likes: number;
//   createDate: string;
//   views: number;
//   author: UserProfile;
//   content: string;
//   isLikedByUser: boolean;
//   editDate: string;
//
//   constructor(input: CommunityArticleNormalResponse) {
//     super();
//     this.id = input.clubsPostId;
//     this.title = input.title;
//     this.status = ArticleCommunityStatus.convertStatus(input.type);
//     this.image = input.thumbnailPath;
//     this.likes = input.likeCount;
//     this.comments = input.repliesCount;
//     this.content = input.content;
//     this.createDate = input.createdAt;
//     this.author = new GroupArticleAuthor({
//       writerId: input.writerId,
//       writerName: input.nickname,
//       writerThumbnail: input.profileImage,
//     });
//
//     // 임시로 데이터 넣음
//     this.views = input.viewCount;
//     this.isLikedByUser = input.isLikedByUser;
//     this.editDate = '2023.08.20 13:27:07';
//   }
// }

export class CommunityArticleNotice {
  id: number;
  status: keyof ArticleStatus;
  title: string;
  content: string;
  createDate: string;
  comments: number;
  likes: number;
  views: number;

  constructor(input: CommunityArticleNoticeResponse) {
    this.id = input.clubsPostId;
    this.title = input.title;
    this.status = ArticleCommunityStatus.convertStatus(input.type);
    this.content = input.content;
    this.createDate = input.createdAt;
    this.comments = input.likeCount ? input.likeCount : 0;
    this.likes = input.repliesCount ? input.repliesCount : 0;
    this.views = 0;
  }
}
