import {Gender, GenderResponse, PlayerLevel} from '~/shared/mapper/userProfile';

export type MyLevelResponse = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'N';

export interface MyProfileResponse {
  userId: number;
  realName: string;
  nickName: string;
  level: MyLevelResponse;
  gender: GenderResponse;
  baemoCode: string;
  description: string;
  profileUrl: string | null;
}

export class MyProfile {
  userId: number;
  name: string;
  nickName: string;
  region: string;
  introduction: string;
  profileImage: string | null;
  level: keyof PlayerLevel;
  gender: keyof Gender;
  constructor(res: MyProfileResponse) {
    this.userId = res.userId;
    this.name = res.realName;
    this.nickName = res.nickName;
    this.introduction = res.description;
    this.profileImage = res.profileUrl ? res.profileUrl : '';
    this.gender = res.gender;
    this.level = res.level;

    /** 아직 없는 필드들(빈 문자열로 일단 처리) **/
    this.region = '';
  }
}

export class MyData {
  userId: number;
  realName: string;
  nickName: string;
  baemoCode: string;
  description: string;
  profileUrl: string | null;
  constructor(res: MyProfileResponse) {
    this.userId = res.userId;
    this.realName = res.realName;
    this.nickName = res.nickName;
    this.baemoCode = res.baemoCode;
    this.description = res.description;
    this.profileUrl = res.profileUrl;
  }
}
