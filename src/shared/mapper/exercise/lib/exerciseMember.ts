import {GenderResponse, PlayerLevel, PlayerLevelResponse, UserProfile, UserProfileResponse} from '~/shared/mapper/userProfile';
import {GameResponse, GameStatus} from '~/shared/mapper/exercise';

export type ExerciseMemberStatusResponse = 'PARTICIPATE' | 'WAITING' | 'PENDING' | 'NOT_PARTICIPATE';
export type ExerciseMemberRoleResponse = 'ADMIN' | 'MEMBER' | 'GUEST' | 'NON_MEMBER';
export type ExerciseGameMemberStatusResponse = 'WAITING' | 'NEXT' | 'PROGRESS' | 'COMPLETE';

export class ExerciseMemberStatus {
  readonly PARTICIPATE: string;
  readonly WAITING: string;
  readonly PENDING: string;
  readonly NOT_PARTICIPATE: string;

  static convertStatus(input: ExerciseMemberStatusResponse) {
    switch (input) {
      case 'PARTICIPATE':
        return 'PARTICIPATE';
      case 'WAITING':
        return 'WAITING';
      case 'PENDING':
        return 'PENDING';
      default:
        return 'NOT_PARTICIPATE';
    }
  }

  constructor() {
    this.PARTICIPATE = 'PARTICIPATE';
    this.WAITING = 'WAITING';
    this.PENDING = 'PENDING';
    this.NOT_PARTICIPATE = 'NOT_PARTICIPATE';
  }
}

export class ExerciseMemberRole {
  readonly ADMIN: string;
  readonly MEMBER: string;
  readonly GUEST: string;
  readonly NON_MEMBER: string;

  static convertRole(input: ExerciseMemberRoleResponse) {
    switch (input) {
      case 'ADMIN':
        return 'ADMIN';
      case 'MEMBER':
        return 'MEMBER';
      case 'GUEST':
        return 'GUEST';
      case 'NON_MEMBER':
        return 'NON_MEMBER';
    }
  }

  constructor() {
    this.ADMIN = '운영자';
    this.MEMBER = '모임원';
    this.GUEST = '게스트';
    this.NON_MEMBER = '비회원';
  }
}

export class ExerciseGameMemberStatus {
  readonly WAITING: string;
  readonly NEXT: string;
  readonly PROGRESS: string;
  readonly COMPLETE: string;

  constructor() {
    this.WAITING = '대기중';
    this.NEXT = '다음게임 준비';
    this.PROGRESS = '게임 진행중';
    this.COMPLETE = '게임 완료';
  }

  static convertStatus(input: ExerciseGameMemberStatusResponse) {
    switch (input) {
      case 'WAITING':
        return 'WAITING';
      case 'NEXT':
        return 'NEXT';
      case 'PROGRESS':
        return 'PROGRESS';
      default:
        return 'COMPLETE';
    }
  }
}

//------------------------------------------------//

export interface ExerciseMemberResponse {
  userId: number;
  userName: string;
  profileImage: string | null;
  userRole: ExerciseMemberRoleResponse;
  userStatus: ExerciseMemberStatusResponse;
  appliedName: string; // 초대원 이름
  level: PlayerLevelResponse;
  gender: GenderResponse;
}

export interface ExerciseGuestMemberResponse extends ExerciseMemberResponse {
  appliedName: string;
}

export interface ExerciseGameMemberResponse {
  userId: number;
  userName: string;
  profileImage: string;

  /** ### userStatus
   * #### 용도
   * - 게임 생성 시 유저의 현재 상태(게임 진행중, 대기중...) 정보를 표시
   * > #### ! 주의
   * > - `ExerciseMemberStatus` 와 전혀 다른 필드임!
   */
  userStatus: GameResponse['matchStatus'];
  level: PlayerLevelResponse;
  gender: GenderResponse;

  // 조회 시점 기준 유저가 참가한 게임의 개수
  matchCount: number;
}

export class ExerciseMember {
  readonly userProfile: UserProfile;
  readonly memberStatus: keyof ExerciseMemberStatus;
  readonly userRole: keyof ExerciseMemberRole;

  constructor(input: ExerciseMemberResponse) {
    const convertUser = {
      userId: input.userId,
      name: input.userName,
      nickName: '',
      profileImage: input.profileImage,
      level: input.level,
      gender: input.gender,
    };
    this.userProfile = new UserProfile(convertUser);
    this.memberStatus = ExerciseMemberStatus.convertStatus(input.userStatus);
    this.userRole = ExerciseMemberRole.convertRole(input.userRole);
  }
}

export class ExerciseGuestMember extends ExerciseMember {
  readonly appliedName: string;

  constructor(input: ExerciseGuestMemberResponse) {
    super(input);
    this.appliedName = input.appliedName;
  }
}

export class ExerciseGameMember extends UserProfile {
  readonly memberStatus: keyof GameStatus;
  readonly matchCount: number;

  constructor(res: ExerciseGameMemberResponse) {
    const convertResponse: UserProfileResponse = {
      userId: res.userId,
      name: res.userName,
      profileImage: res.profileImage,
      nickName: '',
      level: res.level,
      gender: res.gender,
    };
    super(convertResponse);
    this.memberStatus = GameStatus.convertStatus(res.userStatus);
    this.matchCount = res.matchCount;
  }
}
