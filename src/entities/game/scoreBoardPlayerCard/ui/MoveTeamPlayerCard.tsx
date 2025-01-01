import {PlayerProfile} from '~/shared/mapper/userProfile';
import styled from 'styled-components/native';
import {PlayerProfileCard} from '~/shared/ui/game/playerProfileCard.tsx';
import MoveTeamBIcon from '~/shared/images/svg/move_team_b.svg';
import MoveTeamAIcon from '~/shared/images/svg/move_team_a.svg';

interface ScoreBoardPlayerCardProps {
  moveTeamA: () => void;
  moveTeamB: () => void;
  user: PlayerProfile;
}

export const MoveTeamPlayerCard = ({moveTeamA, moveTeamB, user}: ScoreBoardPlayerCardProps) => {
  return (
    <StyledContainer>
      <StyledButtonContainer onPress={moveTeamA}>
        <MoveTeamAIcon onPress={moveTeamA} />
      </StyledButtonContainer>
      <PlayerProfileCard user={user} />
      <StyledButtonContainer>
        <MoveTeamBIcon onPress={moveTeamB} />
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
