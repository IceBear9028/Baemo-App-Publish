import {GenderResponse, UserProfile, UserProfileResponse} from '~/shared/mapper/userProfile';
import {ExerciseMemberResponse} from '~/shared/mapper/exercise';

export interface PlayerProfileResponse {
  userId: number;
  name: string;
  nickName: string;
  profileImage: string | null;
  level: PlayerProfileResponse;
  gender: GenderResponse;
}

export class PlayerProfile extends UserProfile {
  constructor(res: Omit<ExerciseMemberResponse, 'userStatus' | 'appliedName' | 'userRole'>) {
    const convertResponse: UserProfileResponse = {
      userId: res.userId,
      name: res.userName,
      profileImage: res.profileImage,
      nickName: '',
      level: res.level,
      gender: res.gender,
    };
    super(convertResponse);
  }
}
