import {create} from 'zustand';

export type ImageStatusType = 'group' | 'community' | 'notice';

export type PickerImageInfo = {
  uri?: string;
  width?: number;
  height?: number;
  fileName?: string;
  type?: string;
};

type PickerImageStoreType = {
  communityImages: PickerImageInfo[];
  groupImages: PickerImageInfo[];
  serviceNoticeImages: PickerImageInfo[];
};

type ActionPickerImagesType = {
  setGroupImages: (input: PickerImageInfo[]) => void;
  setCommunityImages: (input: PickerImageInfo[]) => void;
  setNoticeImages: (input: PickerImageInfo[]) => void;
  initGroupImage: (input: PickerImageInfo[]) => void;
  initCommunityImages: (input: PickerImageInfo[]) => void;
  initNoticeImages: (input: PickerImageInfo[]) => void;
  deleteGroupImage: (input: number) => void;
  deleteCommunityImage: (input: number) => void;
  deleteNoticeImage: (input: number) => void;
  resetGroupImages: () => void;
  resetCommunityImages: () => void;
  resetNoticeImages: () => void;
};

export const useArticleImageStore = create<PickerImageStoreType & ActionPickerImagesType>((set, get) => ({
  communityImages: [],
  groupImages: [],
  serviceNoticeImages: [],

  // 이미지 변경
  setCommunityImages: input => set(prev => ({...prev, communityImages: [...prev.communityImages, ...input]})),
  setGroupImages: input => set(prev => ({...prev, groupImages: [...prev.groupImages, ...input]})),
  setNoticeImages: input => set(prev => ({...prev, serviceNoticeImages: [...prev.serviceNoticeImages, ...input]})),

  // 이미지 초기화
  initGroupImage: input => set(prev => ({...prev, groupImages: input})),
  initCommunityImages: input => set(prev => ({...prev, groupImages: input})),
  initNoticeImages: input => set(prev => ({...prev, serviceNoticeImages: input})),

  // 이미지 삭제
  deleteGroupImage: deleteId => {
    const deleteImages = get().groupImages.filter((_, index) => index !== deleteId);
    return set(prev => ({...prev, groupImages: deleteImages}));
  },
  deleteCommunityImage: deleteId => {
    const deleteImages = get().communityImages.filter((_, index) => index !== deleteId);
    return set(prev => ({...prev, communityImages: deleteImages}));
  },
  deleteNoticeImage: deleteId => {
    const deleteImages = get().serviceNoticeImages.filter((_, index) => index !== deleteId);
    return set(prev => ({...prev, serviceNoticeImages: deleteImages}));
  },

  // 이미지 store 리셋
  resetCommunityImages: () => set(prev => ({...prev, communityImages: []})),
  resetGroupImages: () => set(prev => ({...prev, groupImages: []})),
  resetNoticeImages: () => set(prev => ({...prev, serviceNoticeImages: []})),
}));
