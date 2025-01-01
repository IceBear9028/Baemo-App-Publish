import {create} from 'zustand';
import {useEffect} from 'react';
import {MyProfile} from '~/shared/mapper/userProfile';
import {getMyProfile, removeMyProfile, setAsyncMyProfile} from '~/shared/authentication/lib/settingMyProfile.ts';

interface MyProfileStore extends MyProfile {
  initialProfile: () => Promise<void>;
  setMyProfile: (profile: MyProfile) => Promise<void>;
  resetMyProfile: () => Promise<void>;
}

const INIT_PROFILE: MyProfile = {
  userId: NaN,
  name: '',
  nickName: '',
  region: '',
  introduction: '',
  profileImage: '',
  level: 'N',
  gender: 'M',
};

/** ### useMyProfileStore
 * #### 용도
 * - [임시] 최초 로그인 시 사용자 정보를 저장
 * #### 사용가능한 field
 * ```
 * userId : number // 유저의 고유 id
 * profileImage : string // 유저의 프로필 이미지
 * name : string // 유저의 실명
 * ```
 */
export const useMyProfileStore = create<MyProfileStore>((set, get) => ({
  ...INIT_PROFILE,
  initialProfile: async () => {
    const savedProfile = await getMyProfile();
    if (savedProfile.userId) {
      set(prev => ({...prev, ...savedProfile}));
    } else {
      await removeMyProfile();
    }
  },
  setMyProfile: async (profile: MyProfile) => {
    await setAsyncMyProfile(profile);
    set(prev => ({...prev, ...profile}));
  },
  resetMyProfile: async () => {
    await removeMyProfile();
    set(prev => ({...prev, ...INIT_PROFILE}));
  },
}));

/** 처음 어플을 킨 후 AsyncStorage 에 저장된 MyProfile 정보를 표시
 */
export function useInitMyProfile() {
  const {initialProfile, userId} = useMyProfileStore();
  useEffect(() => {
    initialProfile();
  }, [userId]);
}
