import {GenderResponse, PlayerLevelResponse, UserProfile} from '~/shared/mapper/userProfile';
import {GroupRole, GroupRoleKeys, GroupRoleResponse} from '~/shared/mapper/groups';

export class GroupMemberStatus {
  readonly '0': string;
  readonly '1': string;
  readonly '2': string;
  readonly '3': string;

  static convertRole(input: GroupRoleKeys) {
    switch (input) {
      case 'ADMIN':
        return '0';
      case 'MANAGER':
        return '1';
      case 'MEMBER':
        return '2';
      default:
        return '3';
    }
  }

  constructor() {
    this['0'] = '모임장';
    this['1'] = '운영자';
    this['2'] = '회원';
    this['3'] = '비회원';
  }
}

export interface GroupMembersResponse {
  userId: number;
  id: number; // 삭제예정
  profilePath: string; // 삭제예정
  profileImage: string;
  realName: string;
  role: GroupRoleResponse;
  level: PlayerLevelResponse;
  gender: GenderResponse;
}

export class GroupMember {
  readonly userProfile: UserProfile;
  readonly memberStatus: keyof GroupRole;

  constructor(memberRes: GroupMembersResponse) {
    this.userProfile = {
      userId: memberRes.userId,
      name: memberRes.realName,
      nickName: '',
      profileImage: memberRes.profileImage,
      playerLevel: memberRes.level,
      gender: memberRes.gender,
    };
    this.memberStatus = GroupRole.convertRole(memberRes.role);
  }
}
