import {ImageStatusType, useArticleImageStore} from './useArticleImageStore.ts';

export function useGetPickerImages(articleStatus: ImageStatusType) {
  const {communityImages, groupImages, noticeImages} = useArticleImageStore(prev => ({
    communityImages: prev.communityImages,
    groupImages: prev.groupImages,
    noticeImages: prev.serviceNoticeImages,
  }));

  function getImages() {
    switch (articleStatus) {
      case 'group':
        return groupImages;
      case 'notice':
        return noticeImages;
      case 'community':
        return communityImages;
    }
  }

  function getPrevImageCount() {
    switch (articleStatus) {
      case 'group':
        return groupImages.length;
      case 'community':
        return communityImages.length;
      case 'notice':
        return noticeImages.length;
    }
  }

  return {
    getImages,
    getPrevImageCount,
  };
}
