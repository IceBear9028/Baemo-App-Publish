import {ArticleCommunityStatus} from '~/shared/mapper/community';

export interface CommunityCategoryResponse_LEGACY {
  id: number;
  status: keyof ArticleCommunityStatus;
  name: string;
  isSubscribed: boolean;
}

export type CommunityCategoryResponse = string;

export class CommunityCategory {
  id: number;
  status: keyof ArticleCommunityStatus;
  name: string;
  isSubscribed: boolean;
  constructor(input: CommunityCategoryResponse) {
    this.id = 0;
    this.status = '101';
    this.name = input;
    this.isSubscribed = false;
  }
}
