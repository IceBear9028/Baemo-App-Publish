import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import BtnBackArrowSvg from '~/shared/images/svg/arrow_back.svg';
import {useArticleTitleStore} from '../model/useArticleTitleStore.ts';
import {useArticleTextStore} from '../model/useArtcleTextStore.ts';
import {useArticleImageStore} from 'features/community/articleImagePicker';
import {useArticleStatusStore} from '~/features/community/selectArticleStatus';

export const CommunityArticleBackButton = () => {
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

  function existArticle() {
    if (communityImages.length || title || text || communityArticleStatus) {
      Alert.alert('아직 글을 작성중입니다.', '글을 임시저장할까요?.', [
        {
          text: '아니요',
          onPress: () => {
            navigateBack();
            resetTitle();
            resetText();
            resetCommunityImages();
            resetCommunityArticleStatus();
          },
        },
        {
          text: '네',
          onPress: () => {
            navigateBack();
          },
        },
      ]);
    } else {
      navigateBack();
    }
  }

  return (
    <StyledButtonContainer onPress={existArticle}>
      <BtnBackArrowSvg />
    </StyledButtonContainer>
  );
};

const StyledButtonContainer = styled.TouchableOpacity``;
