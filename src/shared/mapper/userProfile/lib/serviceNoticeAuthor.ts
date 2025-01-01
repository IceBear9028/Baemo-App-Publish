import {UserProfile} from '~/shared/mapper/userProfile';

export interface ServiceNoticeAuthorResponse {
  writerName: string;
  writerProfileUrl: string;
}

export class ServiceNoticeAuthor implements Pick<UserProfile, 'profileImage' | 'userId' | 'name'> {
  public name: string;
  public userId: number;
  public profileImage: string;

  constructor(res: ServiceNoticeAuthorResponse) {
    this.name = res.writerName;
    this.userId = NaN;
    this.profileImage = res.writerProfileUrl;
  }
}
