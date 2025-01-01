import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import BtnBackArrowSvg from '~/shared/images/svg/arrow_back.svg';
import {useArticleImageStore} from 'features/community/articleImagePicker';
import {useArticleTextStore} from '../model/useArtcleTextStore.ts';
import {useArticleTitleStore} from '../model/useArticleTitleStore.ts';

export const ServiceNoticeArticleBackButton = () => {
  const {navigateBack} = useMainNavigate();
  const {title, resetTitle} = useArticleTitleStore(prev => ({
    title: prev.title,
    resetTitle: prev.resetTitle,
  }));
  const {text, resetText} = useArticleTextStore(prev => ({
    text: prev.text,
    resetText: prev.resetText,
  }));
  const {groupImages, resetGroupImages} = useArticleImageStore(prev => ({
    groupImages: prev.groupImages,
    resetGroupImages: prev.resetGroupImages,
  }));

  function existArticle() {
    if (groupImages.length || title || text) {
      Alert.alert('아직 글을 작성중입니다.', '글을 임시저장할까요?.', [
        {
          text: '아니요',
          onPress: () => {
            navigateBack();
            resetTitle();
            resetText();
            resetGroupImages();
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
