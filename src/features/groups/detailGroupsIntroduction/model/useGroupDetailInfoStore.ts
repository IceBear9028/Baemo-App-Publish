import {create} from 'zustand';

interface StoreType {
  background: string;
  description: string;
}

interface GroupDetailInfo {
  info: StoreType;
  setBackground: (input: StoreType['background']) => void;
  setDescription: (input: StoreType['description']) => void;
  resetInfo: () => void;
}

const INIT_STORE: StoreType = {
  background: '',
  description: '',
};

export const useGroupDetailInfoStore = create<GroupDetailInfo>((set, get) => ({
  info: INIT_STORE,
  setDescription: desc => set(prev => ({...prev, info: {...prev.info, description: desc}})),
  setBackground: bg => set(prev => ({...prev, info: {...prev.info, background: bg}})),
  resetInfo: () => set(prev => ({...prev, info: INIT_STORE})),
}));
