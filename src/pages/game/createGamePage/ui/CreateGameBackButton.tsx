import styled from 'styled-components/native';
import BtnBackArrowSvg from '~/shared/images/svg/arrow_back.svg';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';
import {useTeamMetaStore} from '~/features/game/teamMetaStore';
import {useMainNavigate} from '~/shared/route';

export const CreateGameBackButton = () => {
  const {navigateBack} = useMainNavigate();
  const {resetStatus} = useTeamMetaStore();
  const {resetStore} = useSpecifyTeamStore();

  function exitCreateGame() {
    navigateBack();
    resetStatus();
    resetStore();
  }

  return (
    <StyledButtonContainer onPress={exitCreateGame}>
      <BtnBackArrowSvg />
    </StyledButtonContainer>
  );
};

const StyledButtonContainer = styled.TouchableOpacity``;
