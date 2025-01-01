import {
  FriendRequestResponse,
  Gender,
  GenderResponse,
  MyLevelResponse,
  PlayerLevel,
  PlayerLevelResponse,
} from '~/shared/mapper/userProfile';

export interface UserProfileResponse {
  userId: number;
  name: string;
  nickName: string;
  profileImage: string | null;
  level: PlayerLevelResponse;
  gender: GenderResponse;
}

export class UserProfile {
  readonly userId: number;
  readonly name: string;
  readonly nickName: string;
  readonly profileImage: string | null;
  readonly playerLevel: keyof PlayerLevel;
  readonly gender: keyof Gender;

  constructor(userInfoRes: UserProfileResponse) {
    this.userId = userInfoRes.userId;
    this.name = userInfoRes.name;
    this.nickName = userInfoRes.nickName;
    this.profileImage = userInfoRes.profileImage;
    this.playerLevel = userInfoRes.level;
    this.gender = userInfoRes.gender;
  }
}

export interface tempUserProfileResponse {
  userId: number;
  realName: string;
  level: MyLevelResponse;
  gender: GenderResponse;
  description: string;
  profileUrl: string;
  isFriend: boolean;
  friendRequestStatus: FriendRequestResponse;
}

// export class tempUserProfile {
//   readonly userId: number;
//   readonly realName: string;
//   readonly description: string;
//   readonly profileUrl: string;
//   readonly isFriend: boolean;
//
//   constructor(userInfoRes: tempUserProfileResponse) {
//     this.userId = userInfoRes.userId;
//     this.realName = userInfoRes.realName;
//     this.description = userInfoRes.description;
//     this.profileUrl = userInfoRes.profileUrl;
//     this.isFriend = userInfoRes.isFriend;
//   }
// }
