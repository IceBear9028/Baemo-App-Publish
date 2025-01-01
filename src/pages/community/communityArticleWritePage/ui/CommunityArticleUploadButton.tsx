import {useArticleTitleStore} from '~/pages/community/communityArticleWritePage/model/useArticleTitleStore.ts';
import {useArticleTextStore} from '~/pages/community/communityArticleWritePage/model/useArtcleTextStore.ts';
import {Button, ButtonText} from '@gluestack-ui/themed';
import {useArticleImageStore} from '~/features/community/articleImagePicker/model/useArticleImageStore.ts';
import {useMainNavigate} from '~/shared/route';
import {useArticleStatusStore} from '~/features/community/selectArticleStatus';

export const CommunityArticleUploadButton = () => {
  const {navigateBack} = useMainNavigate();
  const {title, resetTitle} = useArticleTitleStore(prev => ({
    title: prev.title,
    resetTitle: prev.resetTitle,
  }));
  const {text, resetText} = useArticleTextStore(prev => ({
    text: prev.text,
    resetText: prev.resetText,
  }));
  const {communityImages, resetCommunityImages} = useArticleImageStore(prev => ({
    communityImages: prev.communityImages,
    resetCommunityImages: prev.resetCommunityImages,
  }));
  const {communityArticleStatus, resetCommunityArticleStatus} = useArticleStatusStore(prev => ({
    communityArticleStatus: prev.communityArticleStatus,
    resetCommunityArticleStatus: prev.resetCommunityArticleStatus,
  }));

  function uploadArticle() {
    navigateBack();
    resetText();
    resetTitle();
    resetCommunityImages();
    resetCommunityArticleStatus();
  }

  return (
    <Button size={'xs'} action={'secondary'} variant={'link'} onPress={uploadArticle}>
      <ButtonText>업로드</ButtonText>
    </Button>
  );
};
