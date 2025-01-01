import BtnBackArrowSvg from '~/shared/images/svg/arrow_back.svg';
import styled from 'styled-components/native';
import {useGroupCommentStore} from '~/features/groups/groupCommentWriteForm';
import {useMainNavigate} from '~/shared/route';

export const DetailGroupArticleBackButton = () => {
  const {navigateBack} = useMainNavigate();
  const {resetContent} = useGroupCommentStore();

  function pressEvent() {
    resetContent();
    navigateBack();
  }
  return (
    <StyledButtonContainer onPress={pressEvent}>
      <BtnBackArrowSvg />
    </StyledButtonContainer>
  );
};

const StyledButtonContainer = styled.TouchableOpacity``;
