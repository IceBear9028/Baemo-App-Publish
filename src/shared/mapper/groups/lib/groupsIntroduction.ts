import {Groups} from '~/shared/mapper/groups';

export type GroupRoleResponse = 'ADMIN' | 'MANAGER' | 'MEMBER' | 'PENDING' | 'NON_MEMBER';
export type GroupRoleKeys = keyof GroupRole;

export class GroupRole {
  readonly ADMIN: string;
  readonly MANAGER: string;
  readonly MEMBER: string;
  readonly NON_MEMBER: string;
  readonly PENDING: string;

  constructor() {
    this.ADMIN = '모임장';
    this.MANAGER = '운영자';
    this.MEMBER = '일반 회원';
    this.NON_MEMBER = '비회원';
    this.PENDING = '가입 대기중';
  }

  static convertRole(input: GroupRoleKeys) {
    switch (input) {
      case 'ADMIN':
        return 'ADMIN';
      case 'MANAGER':
        return 'MANAGER';
      case 'MEMBER':
        return 'MEMBER';
      case 'PENDING':
        return 'PENDING';
      default:
        return 'NON_MEMBER';
    }
  }
}

export interface GroupsIntroResponse {
  // groupsId: number;
  // introduction: string;
  // background: string;
  clubsName: string;
  clubsSimpleDescription: string;
  clubsDescription: string;
  clubsLocation: string;
  clubsProfileImagePath: string;
  clubsBackgroundImagePath: string;
  clubsMemberCount: 0;
  role: GroupRoleResponse;
}

export class GroupsIntro implements Pick<Groups, 'groupsName' | 'groupsDescription' | 'location' | 'gatheringThumbnail'> {
  // groupsId: number;
  // name
  groupsName: string;
  groupsDescription: string;
  location: string;
  introduction: string;
  gatheringThumbnail: string;
  background: string;
  headCount: number;
  role: keyof GroupRole;

  constructor({...GatheringRes}: GroupsIntroResponse) {
    // this.groupsId = GatheringRes.;
    this.groupsName = GatheringRes.clubsName;
    this.groupsDescription = GatheringRes.clubsSimpleDescription;
    this.gatheringThumbnail = GatheringRes.clubsProfileImagePath;
    this.location = GatheringRes.clubsLocation;
    this.introduction = GatheringRes.clubsDescription;
    this.background = GatheringRes.clubsBackgroundImagePath;
    this.headCount = GatheringRes.clubsMemberCount;
    this.role = GroupRole.convertRole(GatheringRes.role);
  }
}
