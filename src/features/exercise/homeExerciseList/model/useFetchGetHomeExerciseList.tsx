import {useQuery} from '@tanstack/react-query';
import {fetchGetHomeExerciseList} from '../api/fetchGetHomeExerciseList.ts';

export const homeExerciseListQueryKey = ['fetchGetHomeExerciseList'];

export function useFetchGetHomeExerciseList() {
  const {isFetching, isError, data} = useQuery({
    queryKey: homeExerciseListQueryKey,
    queryFn: fetchGetHomeExerciseList,
    throwOnError: true,
  });

  return {
    isFetching,
    isError,
    homeExerciseList: data,
  };
}
