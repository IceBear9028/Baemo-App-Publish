import {useState} from 'react';
import {ExerciseStatus} from '~/shared/mapper/exercise';

export function useSelectExerciseStatus(initStatus: keyof ExerciseStatus) {
  const [selectExerciseStatus, setStatus] = useState<keyof ExerciseStatus>(initStatus);
  const [isOpen, setOpen] = useState<boolean>(false);

  function setExerciseStatus(input: keyof ExerciseStatus) {
    console.log(isOpen);
    setStatus(input);
    setOpen(prev => !prev);
  }

  function setOpenStatus() {
    setOpen(prev => !prev);
  }

  return {selectExerciseStatus, setExerciseStatus, isOpen, setOpenStatus};
}
