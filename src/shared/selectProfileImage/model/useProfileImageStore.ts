import {create} from 'zustand';
import {selectProfileImagePicker} from '../lib/selectProfileImagePicker.ts';
import {Response} from '@bam.tech/react-native-image-resizer';
import {optimizeProfileImage} from '~/shared/utils';

// store 에 업데이트하는 함수 type
export type UpdateProfileStore = (image: ProfileImageInfo) => void;

export interface ProfileImageInfo {
  uri?: string;
  width?: number;
  height?: number;
  fileName?: string;
  type?: string;
}

// store 의 초기값
const INIT_PROFILE = {};

interface ProfileStore {
  profileImage: ProfileImageInfo;
  selectProfileImage: () => void;
  resetProfileStore: () => void;
  setProfile: UpdateProfileStore;
  getOptimizeProfileImage: () => Promise<Response | undefined>;

  // 초기 서버에서 가져온 uri 주소를 기본값으로 지정할 때 사용
  setInitUri: (uri: string) => void;
}

export const useProfileImageStore = create<ProfileStore>((set, get) => ({
  profileImage: INIT_PROFILE,
  setProfile: image => set(prev => ({...prev, profileImage: image})),
  selectProfileImage: () => {
    selectProfileImagePicker(get().setProfile);
  },
  resetProfileStore: () => set(prev => ({...prev, profileImage: INIT_PROFILE})),
  getOptimizeProfileImage: async () => {
    const selectImage = get().profileImage;
    return await optimizeProfileImage(selectImage);
  },
  setInitUri: initUri => set(prev => ({...prev, profileImage: {...prev.profileImage, uri: initUri}})),
}));
