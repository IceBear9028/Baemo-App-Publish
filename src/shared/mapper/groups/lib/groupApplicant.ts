import {GroupRoleResponse} from '~/shared/mapper/groups';
import {GenderResponse, PlayerLevelResponse, UserProfile, UserProfileResponse} from '~/shared/mapper/userProfile';

export interface GroupApplicantResponse {
  userId: number;
  id: number; // 곧 삭제예정
  realName: string;
  profilePath: string; // 곧 삭제예정
  profileImage: string;
  role: GroupRoleResponse; // 어짜피 'PENDING' 일거임
  level: PlayerLevelResponse;
  gender: GenderResponse;
}

export class GroupApplicant extends UserProfile {
  constructor(res: GroupApplicantResponse) {
    const convertData: UserProfileResponse = {
      userId: res.userId,
      name: res.realName,
      nickName: '',
      profileImage: res.profilePath,
      level: res.level,
      gender: res.gender,
    };
    super(convertData);
  }
}
