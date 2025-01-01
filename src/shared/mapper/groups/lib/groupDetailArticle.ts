import {ArticleGroupStatus, GroupArticleResponseType} from '~/shared/mapper/groups';
import {DetailArticle, DetailArticlePermission} from '~/shared/mapper/community';

export interface GroupArticleImageResponse {
  path: string;
  orderNumber: number;
  isThumbnail: boolean;
}

export interface GroupDetailArticleResponse {
  type: GroupArticleResponseType;
  title: string;
  content: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  postImageList: GroupArticleImageResponse[];
  likeCount: number;
  isAuthor: boolean;
  isLikedByUser: boolean;
}

export class GroupDetailArticle extends DetailArticle<GroupArticleImageResponse> {
  public status: keyof ArticleGroupStatus;
  public title: string;
  public likes: number;
  public views: number;
  public createDate: string;
  public editDate: string;
  public isLikedByUser: boolean;
  public readonly contentAll: string;
  public readonly permission: keyof DetailArticlePermission;
  public readonly imageAll: GroupArticleImageResponse[];

  constructor(input: GroupDetailArticleResponse) {
    super();
    this.title = input.title;
    this.likes = input.likeCount;
    this.views = input.viewCount;
    this.editDate = input.updatedAt;
    this.createDate = input.createdAt;
    this.isLikedByUser = input.isLikedByUser;
    this.contentAll = input.content;
    this.status = ArticleGroupStatus.convertStatus(input.type);
    this.permission = DetailArticlePermission.convertPermission(input.isAuthor);
    this.imageAll = input.postImageList;
  }
}
