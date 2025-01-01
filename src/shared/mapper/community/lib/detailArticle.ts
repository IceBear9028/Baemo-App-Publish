import {Article, ArticleStatus} from '~/shared/mapper/community';

export interface ArticleImageItemResponse {
  path: string;
  orderNumber: number;
  isThumbnail: boolean;
}

export interface DetailArticleResponse<T = ArticleImageItemResponse> {
  id: number;
  title: string;
  permission: boolean;
  contentAll: string;
  imageAll: T[];
}

type BaseArticle = Omit<Article, 'image' | 'content' | 'id' | 'comments' | 'author'>;

export class DetailArticlePermission {
  readonly AUTHOR: string;
  readonly READER: string;

  static convertPermission(res: boolean) {
    return res ? 'AUTHOR' : 'READER';
  }

  constructor() {
    this.AUTHOR = '작성자';
    this.READER = '방문자';
  }
}

export abstract class DetailArticle<ImageType = ArticleImageItemResponse> implements BaseArticle {
  abstract status: keyof ArticleStatus;
  abstract title: string;
  abstract likes: number;
  abstract views: number;
  abstract createDate: string;
  abstract editDate: string;
  abstract isLikedByUser: boolean;
  abstract readonly permission: keyof DetailArticlePermission;
  abstract readonly contentAll: string;
  abstract readonly imageAll: ImageType[];
}
