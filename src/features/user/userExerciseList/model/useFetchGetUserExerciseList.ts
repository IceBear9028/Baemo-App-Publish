import {useQuery} from '@tanstack/react-query';
import {fetchGetUserExerciseList} from '../api/fetchGetUserExerciseList.ts';

export function useFetchGetUserExerciseList(userId: number) {
  const {isFetching, isError, data} = useQuery({
    queryKey: ['fetchGetUserExerciseList'],
    queryFn: () => fetchGetUserExerciseList(userId),
  });

  return {
    isFetching,
    isError,
    data,
  };
}
