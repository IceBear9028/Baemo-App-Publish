import {UserProfile} from '~/shared/mapper/userProfile';

export interface GroupAuthorResponse {
  writerId: number;
  writerName: string;
  writerThumbnail: string;
}

export class GroupArticleAuthor implements Pick<UserProfile, 'profileImage' | 'userId' | 'name'> {
  profileImage: string | null;
  userId: number;
  name: string;

  constructor(res: GroupAuthorResponse) {
    this.profileImage = res.writerThumbnail;
    this.userId = res.writerId;
    this.name = res.writerName;
  }
}
