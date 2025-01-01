import {Article, ArticleStatus} from '~/shared/mapper/community';
import {GroupArticleAuthor, UserProfile} from '~/shared/mapper/userProfile';
import {GroupRoleKeys} from '~/shared/mapper/groups';

export type GroupArticleResponseType = 'NOTICE' | 'CLUBS' | 'GREETING' | 'FREE';
export type GroupArticleType = 'NOTICE' | 'CLUBS' | 'GREETING' | 'FREE';

export class ArticleGroupStatus {
  readonly '0': string;
  readonly '1': string;
  readonly '2': string;
  readonly '3': string;
  constructor() {
    this['0'] = '공지';
    this['1'] = '모임활동';
    this['2'] = '가입인사';
    this['3'] = '자유게시판';
  }

  static getGroupStatus(input: GroupRoleKeys) {
    switch (input) {
      case 'ADMIN':
        return {
          '0': '공지',
          '1': '모임활동',
          '2': '가입인사',
          '3': '자유게시판',
        };
      case 'MANAGER':
        return {
          '0': '공지',
          '1': '모임활동',
          '2': '가입인사',
          '3': '자유게시판',
        };
      case 'MEMBER':
        return {
          '1': '모임활동',
          '2': '가입인사',
          '3': '자유게시판',
        };
      default:
        return {};
    }
  }

  static convertStatus(input: GroupArticleResponseType) {
    const statusCode: {[index in GroupArticleResponseType]: keyof ArticleGroupStatus} = {
      NOTICE: '0',
      CLUBS: '1',
      GREETING: '2',
      FREE: '3',
    };
    return statusCode[input];
  }

  /** ### convertType()
   * #### 사용용도
   * 프론트에서 사용하던 status 를 다시 백엔드 code 로 변환하는 함수
   */
  static convertType(input: keyof ArticleGroupStatus) {
    const statusType: {[index in keyof ArticleGroupStatus]: GroupArticleResponseType} = {
      '0': 'NOTICE',
      '1': 'CLUBS',
      '2': 'GREETING',
      '3': 'FREE',
    };
    return statusType[input];
  }
}

export interface GroupArticleNormalResponse {
  // clubsPostId: number;
  // title: string;
  // type: GroupArticleResponseType;
  // thumbnailPath: string;
  // likeCount: number;
  // viewCount: number;
  // isLikedByUser: boolean;
  // repliesCount: number;
  // content: string;
  // createdAt: string;
  // writerId: number;
  // nickname: string;
  // profileImage: string;

  writerId: number;
  nickname: string;
  profileImage: string;

  clubsPostId: number;
  title: string;
  content: string;
  type: GroupArticleResponseType;
  thumbnailPath: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  repliesCount: number;
  viewCount: number;
  isLikedByUser: true;
}

export interface GroupArticleNoticeResponse {
  // clubsPostId: number;
  // title: string;
  // content: string;
  // createdAt: string;
  // likeCount: number;
  // repliesCount: number;
  // type: GroupArticleResponseType;

  clubsPostId: number;
  title: string;
  content: string;
  type: GroupArticleResponseType;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
  repliesCount: number;
  isLikedByUser: true;
}

///// 클래스 코드들

export class GroupArticle extends Article {
  id: number;
  status: keyof ArticleStatus;
  title: string;
  image: string | null;
  comments: number;
  likes: number;
  createDate: string;
  views: number;
  author: GroupArticleAuthor;
  content: string;
  isLikedByUser: boolean;
  editDate: string;

  /** ### convertType()
   * #### 사용용도
   * 프론트에서 사용하던 status 를 다시 백엔드 code 로 변환하는 함수
   */
  static convertType(input: keyof ArticleGroupStatus) {
    const statusType: {[index in keyof ArticleGroupStatus]: GroupArticleResponseType} = {
      '0': 'NOTICE',
      '1': 'CLUBS',
      '2': 'GREETING',
      '3': 'FREE',
    };
    return statusType[input];
  }

  constructor(input: GroupArticleNormalResponse) {
    super();
    this.id = input.clubsPostId;
    this.title = input.title;
    this.status = ArticleGroupStatus.convertStatus(input.type);
    this.image = input.thumbnailPath;
    this.likes = input.likeCount;
    this.comments = input.repliesCount;
    this.content = input.content;
    this.createDate = input.createdAt;
    this.author = new GroupArticleAuthor({
      writerId: input.writerId,
      writerName: input.nickname,
      writerThumbnail: input.profileImage,
    });

    // 임시로 데이터 넣음
    this.views = input.viewCount;
    this.isLikedByUser = input.isLikedByUser;
    this.editDate = '2023.08.20 13:27:07';
  }
}

export class GroupArticleNotice {
  id: number;
  status: keyof ArticleStatus;
  title: string;
  content: string;
  createDate: string;
  comments: number;
  likes: number;
  views: number;

  constructor(input: GroupArticleNoticeResponse) {
    this.id = input.clubsPostId;
    this.title = input.title;
    this.status = ArticleGroupStatus.convertStatus(input.type);
    this.content = input.content;
    this.createDate = input.createdAt;
    this.comments = input.likeCount ? input.likeCount : 0;
    this.likes = input.repliesCount ? input.repliesCount : 0;
    this.views = 0;
  }
}
