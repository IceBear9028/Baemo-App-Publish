import {useState} from 'react';
import {MyExerciseTimePeriod} from '~/features/exercise/myPastExerciseList';

export function useFilterMyExercise() {
  const filterOptions: MyExerciseTimePeriod[] = ['1_week', '1_month', '3_month'];
  const [filterStatus, setFilter] = useState<MyExerciseTimePeriod>('1_week');

  function onChangeFilter(input: MyExerciseTimePeriod) {
    setFilter(() => input);
  }

  return {
    filterOptions,
    filterStatus,
    onChangeFilter,
  };
}
