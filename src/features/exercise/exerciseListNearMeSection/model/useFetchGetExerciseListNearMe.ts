import {useQuery} from '@tanstack/react-query';
import {fetchGetExerciseNearMeHead} from '../api/fetchGetExerciseListNearMe';

export function useFetchGetExerciseListNearMe() {
  const {isFetching, isError, data} = useQuery({queryKey: ['dd'], queryFn: fetchGetExerciseNearMeHead});
  return {
    isFetching,
    data,
    isError,
  };
}
