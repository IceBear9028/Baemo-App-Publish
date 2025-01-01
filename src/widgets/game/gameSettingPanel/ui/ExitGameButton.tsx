import {Game} from '~/shared/mapper/exercise';
import {useFetchStopGame} from '~/features/game/fetchStopGame';
import {Button, ButtonIcon, ButtonText, ArrowLeftIcon} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';

interface ExitGameButtonProps extends Pick<Game, 'gameId'> {
  isFetching?: boolean;
}

export const ExitGameButton = ({gameId, isFetching}: ExitGameButtonProps) => {
  const {stopGame} = useFetchStopGame();
  return (
    <StyledButtonContainer>
      <Button onPress={() => stopGame(gameId)} size={'sm'} variant={'link'} action={'secondary'}>
        <ButtonIcon as={ArrowLeftIcon} mr="$2" />
        <ButtonText>나가기</ButtonText>
      </Button>
      {isFetching && <ActivityIndicator size={'small'} />}
    </StyledButtonContainer>
  );
};

const StyledButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
`;
