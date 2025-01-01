import {useQuery} from '@tanstack/react-query';
import {fetchGetMyExerciseList} from '../api/fetchGetMyExerciseList.ts';

export const fetchMyExerciseListQueryKey = ['fetchGetMyExerciseList'];

export function useFetchGetMyExerciseList() {
  const {isFetching, isError, data, error, refetch} = useQuery({
    queryKey: fetchMyExerciseListQueryKey,
    queryFn: () => fetchGetMyExerciseList(),
    throwOnError: true,
  });

  return {
    isError,
    isFetching,
    refetch,
    data,
    error,
  };
}
