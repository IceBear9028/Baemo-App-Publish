import {useEffect} from 'react';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {Game} from '~/shared/mapper/exercise';
import {TeamA, TeamB} from './TeamSection.tsx';
import {useMainNavigate} from '~/shared/route';
import GameNextIcon from '~/shared/images/svg/game_arrow_up.svg';
import GamePreviousIcon from '~/shared/images/svg/game_arrow_down.svg';
import {useSelectCourtNumberStore} from '~/widgets/game/selectGameCourtBottomSheet';
import {useFetchChangeGameStatus} from '~/entities/game/gameSettingCard/model/useFetchChangeGameStatus.ts';
import {useFetchRejectJudge} from '~/entities/game/gameSettingCard/model/useFetchRejectJudge.ts';
import {useFetchDeleteGame} from '~/entities/game/gameSettingCard/model/useFetchDeleteGame.ts';
import {GameMenu} from '~/entities/game/gameSettingCard/ui/GameMenu.tsx';

interface GameSettingCardProps extends Game {
  openBottomSheet: () => void;
}

export const GameSettingCard = (props: GameSettingCardProps) => {
  const {navigateEditGame} = useMainNavigate();
  const {deleteGame} = useFetchDeleteGame(props.exerciseId);
  const {rejectJudge} = useFetchRejectJudge(props.exerciseId);
  const {nextStatusGame, prevStatusGame} = useFetchChangeGameStatus();
  const {targetGame, selectCourt, onSelectGame, resetCourt} = useSelectCourtNumberStore();

  const isCompleteGame = props.gameStatus === 4 || props.gameStatus === 5;
  const isProgressGame = props.gameStatus === 2 || props.gameStatus === 3;

  function fetchPrevStatusGame() {
    prevStatusGame(props.exerciseId, props.gameId, props.gameStatus);
    resetCourt();
  }

  function fetchNextStatusGame() {
    if (props.gameStatus === 1) {
      props.openBottomSheet && props.openBottomSheet();
      onSelectGame(props);
      return;
    }
    nextStatusGame(props.exerciseId, props.gameId, props.gameStatus);
  }

  useEffect(() => {
    if (selectCourt && props.gameStatus === 1 && targetGame?.gameId === props.gameId) {
      nextStatusGame(props.exerciseId, props.gameId, props.gameStatus, selectCourt.courtNumber);
    }
  }, [selectCourt]);

  return (
    <StyledContainer>
      {!isCompleteGame && (
        <StyledButton onPress={fetchPrevStatusGame}>
          <GamePreviousIcon />
        </StyledButton>
      )}
      <StyledBody>
        <TeamA team={props.teamA} type={props.gameType} oppositionTeam={props.teamB} />
        <GameMenu
          {...props}
          onNavigateEdit={() => navigateEditGame(props)}
          onDeleteGame={() => deleteGame(props.gameId)}
          onRejectJudge={() => rejectJudge(props.gameId, props.gameStatus)}
        />
        <TeamB team={props.teamB} type={props.gameType} oppositionTeam={props.teamA} />
      </StyledBody>
      {!isCompleteGame && (
        <StyledButton onPress={fetchNextStatusGame}>{isProgressGame ? <Text>완료</Text> : <GameNextIcon />}</StyledButton>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  gap: 24px;
  padding: 16px 0 16px 0;
  justify-content: center;
  align-items: center;
`;

const StyledBody = styled.View`
  flex: 1;
  gap: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled.TouchableOpacity`
  width: 42px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background: #eeeeee;
  border-radius: 8px;
`;
