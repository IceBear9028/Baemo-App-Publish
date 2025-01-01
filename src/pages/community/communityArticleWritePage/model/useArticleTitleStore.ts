import {create} from 'zustand';

type ArticleTitleStoreType = {
  title: string;
};

type ActionTitleType = {
  setTitle: (input: string) => void;
  resetTitle: () => void;
};

export const useArticleTitleStore = create<ArticleTitleStoreType & ActionTitleType>((set, get) => ({
  title: '',
  setTitle: input => set(prev => ({...prev, title: input})),
  resetTitle: () => set(prev => ({...prev, title: ''})),
}));
