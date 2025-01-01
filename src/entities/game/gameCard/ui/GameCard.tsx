import {Fragment} from 'react';
import styled from 'styled-components/native';
import {TeamA, TeamB} from './TeamSection.tsx';
import {ScoreSection} from './ScoreSection.tsx';
import {HeaderSection} from './HeaderSection.tsx';
import {useMainNavigate} from '~/shared/route';
import {Button, ButtonText, Text} from '@gluestack-ui/themed';
import {ExerciseUserRole, Game} from '~/shared/mapper/exercise';
import EmptyMemberIcon from '~/shared/images/svg/game_empty_player.svg';
import {Platform} from 'react-native';

interface GameCardProps extends Game {
  onMatchGame: () => void;
  role: ExerciseUserRole;
}

interface JudgeButtonProps extends Pick<GameCardProps, 'judge' | 'gameStatus'> {
  onPress: () => void;
}

const JudgeButton = ({onPress, gameStatus}: JudgeButtonProps) => {
  if (gameStatus === 2) {
    return (
      <StyledButtonContainer>
        <Button size={'sm'} variant={'link'} onPress={onPress}>
          <ButtonText>심판 보기</ButtonText>
        </Button>
      </StyledButtonContainer>
    );
  }
  if (gameStatus === 3) {
    return (
      <>
        <StyledButtonContainer>
          <Button size={'sm'} variant={'link'} isDisabled={true}>
            <ButtonText>점수 기록 중</ButtonText>
          </Button>
        </StyledButtonContainer>
        <StyledButtonContainer>
          <Button size={'sm'} variant={'link'} onPress={onPress}>
            <ButtonText>심판 보기</ButtonText>
          </Button>
        </StyledButtonContainer>
      </>
    );
  }
  return <Fragment />;
};

const EmptyMemberFallback = () => {
  return (
    <StyledFallback>
      <EmptyMemberIcon />
      <StyledFallbackInfo>
        <Text>게임 인원이 부족합니다.</Text>
      </StyledFallbackInfo>
    </StyledFallback>
  );
};

export const GameCard = (props: GameCardProps) => {
  const isUnMatchMember = props.teamB.player.length !== props.teamA.player.length;
  const {navigateEditGame, navigateDetailGame, navigateDetailSSEGame} = useMainNavigate();

  function navigateDetailGamePage(game: Game) {
    if (game.gameStatus === 3) {
      navigateDetailSSEGame(game.gameId);
    } else {
      navigateDetailGame(game.gameId);
    }
  }

  return (
    <StyledContainer>
      <HeaderSection {...props} onEditGame={() => navigateEditGame(props)} onDetailGame={() => {}} />
      <StyledBody>
        <TeamA team={props.teamA} />
        <ScoreSection
          teamAScore={props.teamA.score}
          teamBScore={props.teamB.score}
          status={props.gameStatus}
          type={props.gameType}
          courtNumber={props.courtNumber}
        />
        <TeamB team={props.teamB} />
      </StyledBody>
      {/* [2024.11.15] 심판버튼 잠깐 비활성화 */}
      {/*<JudgeButton judge={props.judge} gameStatus={props.gameStatus} onPress={props.onMatchGame} />*/}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 12px 14px;
  gap: 18px;
  min-height: 150px;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0 2px;
      shadow-opacity: 0.1;
      shadow-radius: 4px;
    `,
    android: `
      elevation: 2;
    `,
  })}
`;

const StyledBody = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const StyledButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const StyledFallback = styled.View`
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StyledFallbackInfo = styled.View`
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const StyledFallbackSubInfo = styled.View`
  flex-direction: row;
  gap: 8px;
`;
