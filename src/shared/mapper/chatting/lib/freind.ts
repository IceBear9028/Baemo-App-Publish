import {UserProfile, UserProfileResponse} from '~/shared/mapper/userProfile';

export interface FriendResponse extends UserProfileResponse {}

export class Friend extends UserProfile {
  constructor(input: FriendResponse) {
    super(input);
  }
}

export class FriendList {
  static convert(input: FriendResponse[]) {
    return input.map(res => new Friend(res));
  }
}
