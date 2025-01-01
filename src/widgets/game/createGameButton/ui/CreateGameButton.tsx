import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {Button, ButtonText} from '@gluestack-ui/themed';
import {Exercise} from '~/shared/mapper/exercise';
import {useValidateGame} from '../model/useValidateGame.ts';
import {useFetchCreateGame} from '../model/useFetchCreateGame.ts';

interface CreateGameButtonProps extends Pick<Exercise, 'exerciseId'> {}

export const CreateGameButton = ({exerciseId}: CreateGameButtonProps) => {
  const {isNotValidGame} = useValidateGame();
  const {isPending, createGame} = useFetchCreateGame(exerciseId);
  return (
    <Button size={'md'} variant={'link'} isDisabled={isNotValidGame} onPress={createGame}>
      {isPending ? (
        <StyledSpinnerContainer>
          <ActivityIndicator size={'small'} />
        </StyledSpinnerContainer>
      ) : (
        <ButtonText>만들기</ButtonText>
      )}
    </Button>
  );
};

const StyledSpinnerContainer = styled.View`
  padding: 0 10px;
`;
