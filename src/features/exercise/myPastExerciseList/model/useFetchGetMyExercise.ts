import {useQuery} from '@tanstack/react-query';
import {fetchGetMyExercise, MyExerciseTimePeriod} from '../api/fetchGetMyExercise.ts';

export const myPastExerciseListQueryKey = ['fetchGetMyExercise'];
export function useFetchGetMyExercise() {
  const {isFetching, isError, data} = useQuery({
    queryKey: myPastExerciseListQueryKey,
    queryFn: () => fetchGetMyExercise(),
    throwOnError: true,
  });
  console.log('운동확인', data);
  return {
    isError,
    isFetching,
    myPastExerciseList: data,
  };
}
