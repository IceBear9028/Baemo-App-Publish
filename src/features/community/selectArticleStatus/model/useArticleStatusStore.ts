import {create} from 'zustand';
import {ArticleGroupStatus} from '~/shared/mapper/groups';
import {ArticleCommunityStatus} from '~/shared/mapper/community';

type StatusStoreType = {
  communityArticleStatus: keyof ArticleCommunityStatus | null;
  groupArticleStatus: keyof ArticleGroupStatus | null;
};

type ActionStatusType = {
  setCommunityArticleStatus: (input: keyof ArticleCommunityStatus | null) => void;
  setGroupArticleStatus: (input: keyof ArticleGroupStatus | null) => void;
  resetCommunityArticleStatus: () => void;
  resetGroupArticleStatus: () => void;
};

export const useArticleStatusStore = create<StatusStoreType & ActionStatusType>((set, get) => ({
  communityArticleStatus: null,
  groupArticleStatus: null,
  setCommunityArticleStatus: input => set(prev => ({...prev, communityArticleStatus: input})),
  setGroupArticleStatus: input => set(prev => ({...prev, groupArticleStatus: input})),
  resetCommunityArticleStatus: () => set(prev => ({...prev, communityArticleStatus: null})),
  resetGroupArticleStatus: () => set(prev => ({...prev, groupArticleStatus: null})),
}));
