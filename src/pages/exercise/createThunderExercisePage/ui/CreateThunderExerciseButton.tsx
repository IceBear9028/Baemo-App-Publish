import {useEffect, useState} from 'react';
import {Button, ButtonSpinner, ButtonText} from '@gluestack-ui/themed';
import {useThunderExerciseStore} from '~/pages/exercise/createThunderExercisePage';
import {useFetchPostThunderExercise} from '../model/useFetchPostThunderExercise.ts';

export const CreateThunderExerciseButton = () => {
  const {status, isValidExercise} = useThunderExerciseStore();
  const {isPendingExercise, createExercise} = useFetchPostThunderExercise();
  const [isValid, setValid] = useState<boolean>(() => isValidExercise());

  useEffect(() => {
    setValid(() => isValidExercise());
  }, [status]);

  return (
    <Button variant={'link'} isDisabled={!isValid || isPendingExercise} onPress={createExercise}>
      {isPendingExercise ? <ButtonSpinner /> : <ButtonText>만들기</ButtonText>}
    </Button>
  );
};
