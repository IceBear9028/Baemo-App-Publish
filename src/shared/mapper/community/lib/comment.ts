import {UserProfile, UserProfileResponse} from '~/shared/mapper/userProfile';

export interface CommentItemResponse {
  id: number;
  content: string;
  likes: number;
  isLikedByUser: boolean | undefined; // 아직 API 에 추가되지 않음;
  createDate: string;
  editDate: string;
  reply: null | number;
  userProfile: Pick<UserProfileResponse, 'userId' | 'name' | 'profileImage'>;
}

export class Comment {
  commentId: number;
  content: string;
  likes: number;
  isLikedByUser: boolean;
  createDate: string;
  editDate: string;
  reply: null | number;
  commentUser: Pick<UserProfile, 'userId' | 'name' | 'profileImage'>;
  constructor(res: CommentItemResponse) {
    this.commentId = res.id;
    this.content = res.content;
    this.likes = res.likes;
    this.isLikedByUser = !!res.isLikedByUser;
    this.createDate = res.createDate;
    this.editDate = res.editDate;
    this.reply = res.reply;
    this.commentUser = {
      userId: res.userProfile.userId,
      name: res.userProfile.name,
      profileImage: res.userProfile.profileImage,
    };
  }
}

export class CommentList {
  static convert(resList: CommentItemResponse[]): Comment[] {
    return resList.map(item => new Comment(item));
  }
}
