import styled from 'styled-components/native';
import MoveTeamAIcon from '~/shared/images/svg/move_team_b.svg';
import MoveTeamBIcon from '~/shared/images/svg/move_team_a.svg';
import {PlayerProfile} from '~/shared/mapper/userProfile';
import {PlayerProfileCard} from '~/shared/ui/game/playerProfileCard.tsx';

interface TeamPanelPlayerCardProps {
  onDeletePlayer: () => void;
  player: PlayerProfile;
}

export const ATeamPanelPlayerCard = ({player, onDeletePlayer}: TeamPanelPlayerCardProps) => {
  return (
    <StyledContainer direction={'left'}>
      <PlayerProfileCard user={player} team={'a'} />
      <StyledButtonContainer onPress={onDeletePlayer}>
        <MoveTeamAIcon />
      </StyledButtonContainer>
    </StyledContainer>
  );
};

export const BTeamPanelPlayerCard = ({player, onDeletePlayer}: TeamPanelPlayerCardProps) => {
  return (
    <StyledContainer direction={'right'}>
      <StyledButtonContainer onPress={onDeletePlayer}>
        <MoveTeamBIcon />
      </StyledButtonContainer>
      <PlayerProfileCard user={player} team={'b'} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{direction: 'left' | 'right'}>`
  gap: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: ${({direction}) => (direction === 'left' ? 'flex-start' : 'flex-end')};
`;

const StyledButtonContainer = styled.TouchableOpacity``;
