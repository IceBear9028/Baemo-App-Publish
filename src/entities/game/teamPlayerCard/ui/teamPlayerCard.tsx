import styled from 'styled-components/native';
import CancelButtonIcon from '~/shared/images/svg/button_cancelTeam.svg';
import {PlayerProfile} from '~/shared/mapper/userProfile';
import {PlayerProfileCard} from '~/shared/ui/game/playerProfileCard.tsx';

interface TeamPlayerCardProps {
  onDelete: () => void;
  user: PlayerProfile;
}

export const ATeamPlayerCard = ({user, onDelete}: TeamPlayerCardProps) => {
  return (
    <StyledContainer>
      <StyledButtonContainer onPress={onDelete}>
        <CancelButtonIcon />
      </StyledButtonContainer>
      <PlayerProfileCard user={user} team={'a'} />
    </StyledContainer>
  );
};

export const BTeamPlayerCard = ({user, onDelete}: TeamPlayerCardProps) => {
  return (
    <StyledContainer>
      <PlayerProfileCard user={user} team={'b'} />
      <StyledButtonContainer onPress={onDelete}>
        <CancelButtonIcon />
      </StyledButtonContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const StyledButtonContainer = styled.TouchableOpacity``;
