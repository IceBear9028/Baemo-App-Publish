import {GroupArticleAuthor, UserProfile, UserProfileResponse} from '~/shared/mapper/userProfile';
import {ArticleCommunityStatus} from '~/shared/mapper/community';
import {ServiceNoticeArticleStatus} from '~/shared/mapper/community/lib/serviceNoticeArticle.ts';
import {ArticleGroupStatus} from '~/shared/mapper/groups';

export type ArticleStatus = ArticleCommunityStatus & ArticleGroupStatus & ServiceNoticeArticleStatus;

export interface ArticleResponse {
  id: number;
  author: UserProfileResponse;
  status: number;
  title: string;
  content: string;
  image: string | null;
  comments: number;
  views: number;
  likes: number;
  isLikedByUser: boolean;
  createDate: string;
  editDate: string;
}

export abstract class Article {
  abstract id: number;
  abstract status: keyof ArticleStatus;
  abstract title: string;
  abstract image: string | null;
  abstract comments: number;
  abstract likes: number;
  abstract createDate: string;
  abstract views: number;
  abstract author: Pick<UserProfile, 'profileImage' | 'userId' | 'name'>;
  abstract content: string;
  abstract isLikedByUser: boolean;
  abstract editDate: string;
}

export class ArticleList {
  readonly articleList: Article[];
  constructor(articleResList: ArticleResponse[]) {
    this.articleList = articleResList.map(article => ({
      id: article.id,
      author: {...new UserProfile(article.author)},
      status: String(article.status) as keyof ArticleStatus,
      title: article.title,
      content: article.content,
      image: article.image,
      comments: article.comments,
      views: article.views,
      likes: article.likes,
      isLikedByUser: article.isLikedByUser,
      createDate: article.createDate,
      editDate: article.editDate,
    }));
  }
}
