import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import BtnBackArrowSvg from '~/shared/images/svg/arrow_back.svg';
import {useArticleTextStore} from '../model/useArtcleTextStore.ts';
import {useArticleImageStore} from 'features/community/articleImagePicker';
import {useArticleTitleStore} from '../model/useArticleTitleStore.ts';
import {useArticleStatusStore} from '~/features/community/selectArticleStatus';

export const GroupArticleBackButton = () => {
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
  const {groupArticleStatus, resetGroupArticleStatus} = useArticleStatusStore(prev => ({
    groupArticleStatus: prev.groupArticleStatus,
    resetGroupArticleStatus: prev.resetGroupArticleStatus,
  }));

  function existArticle() {
    if (groupImages.length || title || text || groupArticleStatus) {
      Alert.alert('아직 글을 작성중입니다.', '정말로 나갈까요?', [
        {
          text: '아니요',
        },
        {
          text: '네',
          onPress: () => {
            navigateBack();
            resetTitle();
            resetText();
            resetGroupImages();
            resetGroupArticleStatus();
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
