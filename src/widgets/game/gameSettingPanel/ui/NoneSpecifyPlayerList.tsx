import styled from 'styled-components/native';
import {Game} from '~/shared/mapper/exercise';
import {SpecifyTeamButton} from '~/features/game/specifyTeamButton';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';
import {Text, Alert, AlertIcon, InfoIcon} from '@gluestack-ui/themed';
import {MoveTeamPlayerCard} from '~/entities/game/scoreBoardPlayerCard';

interface NoneSpecifyPlayerListProps extends Pick<Game, 'gameId'> {}

export const NoneSpecifyPlayerList = ({gameId}: NoneSpecifyPlayerListProps) => {
  const {teams, addTeamPlayers} = useSpecifyTeamStore();

  if (teams.players.length <= 0) {
    return (
      <StyledInfoContainer>
        <StyledTextContainer>
          <Text size={'sm'} bold>
            게임을 시작할까요?
          </Text>
        </StyledTextContainer>
        <SpecifyTeamButton gameId={gameId} />
      </StyledInfoContainer>
    );
  }

  return (
    <StyledPlayersContainer>
      <Alert action="info" variant="accent">
        <AlertIcon as={InfoIcon} mr="$3" />
        <Text size={'xs'}>{'팀원을 지정해주세요'}</Text>
      </Alert>
      {teams.players.map((player, index) => (
        <MoveTeamPlayerCard
          key={`${index}-${player.userId}`}
          user={player}
          moveTeamA={() => addTeamPlayers('a', player)}
          moveTeamB={() => addTeamPlayers('b', player)}
        />
      ))}
    </StyledPlayersContainer>
  );
};

const StyledPlayersContainer = styled.View`
  gap: 8px;
  min-height: 240px;
`;

const StyledTextContainer = styled.View`
  align-items: center;
  border-radius: 8px;
`;

const StyledInfoContainer = styled.View`
  height: 240px;
  gap: 16px;
  justify-content: center;
`;
