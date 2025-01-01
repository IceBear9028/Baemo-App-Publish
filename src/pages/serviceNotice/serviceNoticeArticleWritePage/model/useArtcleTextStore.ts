import {create} from 'zustand';

type ArticleTextStoreType = {
  text: string;
};

type ActionTextType = {
  setText: (input: string) => void;
  resetText: () => void;
};

export const useArticleTextStore = create<ArticleTextStoreType & ActionTextType>((set, get) => ({
  text: '',
  setText: input => set(prev => ({...prev, text: input})),
  resetText: () => set(prev => ({...prev, text: ''})),
}));
