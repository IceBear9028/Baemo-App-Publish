import styled from 'styled-components/native';
import {Game} from '~/shared/mapper/exercise';
import {Platform, StyleSheet} from 'react-native';
import {Button, ButtonText} from '@gluestack-ui/themed';
import {NoneSpecifyPlayerList} from '../ui/NoneSpecifyPlayerList.tsx';
import {ExitGameButton} from '~/widgets/game/gameSettingPanel/ui/ExitGameButton.tsx';
import {useFetchEditScoreBoard} from '~/features/game/fetchEditScoreBoard';

interface GameSettingPanelProps extends Pick<Game, 'gameId' | 'gameType'> {
  isFetching: boolean;
}

export const GameSettingPanel = ({gameId, gameType, isFetching}: GameSettingPanelProps) => {
  const {revertTeamScore} = useFetchEditScoreBoard();
  if (gameType === 0) {
    return (
      <StyledContainer style={containerStyles.container}>
        <ExitGameButton isFetching={isFetching} gameId={gameId} />
        <NoneSpecifyPlayerList gameId={gameId} />
      </StyledContainer>
    );
  }

  return (
    <StyledContainer style={containerStyles.container}>
      <ExitGameButton gameId={gameId} />
      <Button variant={'outline'} size={'sm'} onPress={() => revertTeamScore(gameId)}>
        <ButtonText>점수 되돌리기</ButtonText>
      </Button>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  position: absolute;
  left: 50%;
  top: 28px;
  transform: translateX(-120px);
  gap: 8px;
  width: 240px;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
`;

const containerStyles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(100, 100, 100)',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        evaluation: 1,
      },
    }),
  },
});
