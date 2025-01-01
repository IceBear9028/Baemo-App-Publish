import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {Button, ButtonText} from '@gluestack-ui/themed';
import {Game} from '~/shared/mapper/exercise';
import {useValidateGame} from '../model/useValidateGame.ts';
import {useFetchEditGame} from '../model/useFetchEditGame.ts';

interface CreateGameButtonProps extends Pick<Game, 'exerciseId' | 'gameId'> {}

export const EditGameButton = ({exerciseId, gameId}: CreateGameButtonProps) => {
  const {isNotValidGame} = useValidateGame();
  const {isPending, editGame} = useFetchEditGame();
  return (
    <Button size={'md'} variant={'link'} isDisabled={isNotValidGame} onPress={() => editGame(exerciseId, gameId)}>
      {isPending ? (
        <StyledSpinnerContainer>
          <ActivityIndicator size={'small'} />
        </StyledSpinnerContainer>
      ) : (
        <ButtonText>변경하기</ButtonText>
      )}
    </Button>
  );
};

const StyledSpinnerContainer = styled.View`
  padding: 0 10px;
`;
