import {ImageStatusType, useArticleImageStore} from './useArticleImageStore.ts';

export function useDeleteImage(articleStatus: ImageStatusType) {
  const {deleteGroupImage, deleteCommunityImage, deleteNoticeImage} = useArticleImageStore(prev => ({
    deleteGroupImage: prev.deleteGroupImage,
    deleteCommunityImage: prev.deleteCommunityImage,
    deleteNoticeImage: prev.deleteNoticeImage,
  }));

  function deleteImage(deleteId: number) {
    switch (articleStatus) {
      case 'group':
        deleteGroupImage(deleteId);
        break;
      case 'community':
        deleteCommunityImage(deleteId);
        break;
      case 'notice':
        deleteNoticeImage(deleteId);
        break;
    }
  }

  return {deleteImage};
}
