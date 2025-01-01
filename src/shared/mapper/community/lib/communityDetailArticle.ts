import {ArticleCommunityStatus, CommunityArticleResponseType, DetailArticle, DetailArticlePermission} from '~/shared/mapper/community';

export interface CommunityArticleImageResponse {
  path: string;
  orderNumber: number;
  isThumbnail: boolean;
}

export interface CommunityDetailArticleResponse {
  type: CommunityArticleResponseType;
  title: string;
  content: string;
  viewCount: number;
  likeCount: number;
  createdAt: string; //'2024-10-22T15:30:50.265Z'
  updatedAt: string; //'2024-10-22T15:30:50.265Z'
  isLikedByUser: true;
  postImageList: {
    postImageList: CommunityArticleImageResponse[];
  };
}

export class CommunityDetailArticle extends DetailArticle<CommunityArticleImageResponse> {
  public status: keyof ArticleCommunityStatus;
  public title: string;
  public likes: number;
  public views: number;
  public createDate: string;
  public editDate: string;
  public isLikedByUser: boolean;
  public readonly contentAll: string;
  public readonly permission: keyof DetailArticlePermission;
  public readonly imageAll: CommunityArticleImageResponse[];

  constructor(input: CommunityDetailArticleResponse, isAuthor: boolean) {
    super();
    this.title = input.title;
    this.likes = input.likeCount;
    this.views = input.viewCount;
    this.editDate = input.updatedAt;
    this.createDate = input.createdAt;
    this.isLikedByUser = input.isLikedByUser;
    this.contentAll = input.content;
    this.status = ArticleCommunityStatus.convertStatus(input.type);
    this.permission = DetailArticlePermission.convertPermission(isAuthor);
    this.imageAll = input.postImageList.postImageList;
  }
}
