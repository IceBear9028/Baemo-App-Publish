import {useQuery} from '@tanstack/react-query';
import {fetchGetDetailExercise} from '~/pages/exercise/detailExercisePage/api/fetchGetDetailExercise.ts';

export function useFetchGetDetailExercise(exerciseId: number) {
  const {isFetching, isError, data} = useQuery({
    queryKey: ['selectExercise'],
    queryFn: () => fetchGetDetailExercise(exerciseId),
  });
  return {
    isFetching,
    isError,
    data,
  };
}
