import {create} from 'zustand';
import ImageResizer, {Response} from '@bam.tech/react-native-image-resizer';
import {selectBackgroundPicker} from '../lib/selectBackgroundPicker.ts';
import {CommonImageInfo, optimizeFullSizeImage} from '~/shared/utils';

// store 에 업데이트하는 함수 type
export type UpdateBackgroundStore = (image: CommonImageInfo) => void;

const BACKGROUND_INIT = {};

interface BackgroundStore {
  background: CommonImageInfo;
  selectBackground: () => void;
  resetBackgroundStore: () => void;
  setBackground: UpdateBackgroundStore;
  getOptimizeBackground: () => Promise<Response | undefined>;
}

export const useBackgroundImageStore = create<BackgroundStore>((set, get) => ({
  background: BACKGROUND_INIT,
  setBackground: image => set(prev => ({...prev, background: image})),
  selectBackground: () => {
    selectBackgroundPicker(get().setBackground);
  },
  resetBackgroundStore: () => set(prev => ({...prev, background: BACKGROUND_INIT})),
  getOptimizeBackground: async () => {
    const selectImage = get().background;
    return await optimizeFullSizeImage(selectImage);
  },
}));
